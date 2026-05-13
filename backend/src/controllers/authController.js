//backend/src/controllers/authController.js
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/generateToken.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/sendEmail.js';
import { sendSmsOtp } from '../utils/sendSms.js';

const COOKIE_NAME = 'civichub_rt';

function setRefreshCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function hashPlain(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function generateNumericCode(length = 6) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

const OTP_EXPIRY_MS = 3 * 60 * 1000;
const EMAIL_OTP_EXPIRY_MS = 60 * 60 * 1000;

export async function register(req, res) {
  try {
    const { email, phone, acceptedTerms } = req.body;

    const emailNorm = email ? String(email).trim().toLowerCase() : null;
    const phoneNorm = phone ? String(phone).trim() : null;

    if ((emailNorm && phoneNorm) || (!emailNorm && !phoneNorm)) {
      return res.status(400).json({ message: 'Please provide either phone or email.' });
    }

    const existingUser = await User.findOne({
      $or: [
        ...(emailNorm ? [{ email: emailNorm }] : []),
        ...(phoneNorm ? [{ phone: phoneNorm }] : []),
      ],
    }).select(
      '+emailVerificationCodeHash +emailVerificationExpires +emailVerificationAttempts ' +
      '+phoneVerificationCodeHash +phoneVerificationExpires +phoneVerificationAttempts ' +
      '+isEmailVerified +isPhoneVerified +isVerified'
    );

    if (existingUser) {
      const alreadyVerified = !!(existingUser.isVerified || existingUser.isEmailVerified || existingUser.isPhoneVerified);

      if (alreadyVerified) {
        return res.status(200).json({
          message: 'Account already exists and is verified. Please login.',
          data: { exists: true, verified: true },
        });
      }

      if (phoneNorm || existingUser.phone) {
        const targetPhone = phoneNorm || existingUser.phone;
        const rawPhoneCode = generateNumericCode(6);
        existingUser.phoneVerificationCodeHash = hashPlain(rawPhoneCode);
        existingUser.phoneVerificationExpires = new Date(Date.now() + OTP_EXPIRY_MS);
        existingUser.phoneVerificationAttempts = 0;
        existingUser.phoneVerificationSendCount = (existingUser.phoneVerificationSendCount || 0) + 1;
        await sendSmsOtp(targetPhone, rawPhoneCode);
      }

      if (emailNorm || existingUser.email) {
        const targetEmail = emailNorm || existingUser.email;
        const rawEmailCode = generateNumericCode(6);
        existingUser.emailVerificationCodeHash = hashPlain(rawEmailCode);
        existingUser.emailVerificationExpires = new Date(Date.now() + EMAIL_OTP_EXPIRY_MS);
        existingUser.emailVerificationAttempts = 0;
        existingUser.emailVerificationSendCount = (existingUser.emailVerificationSendCount || 0) + 1;
        await sendVerificationEmail(existingUser, rawEmailCode);
      }

      await existingUser.save();

      return res.status(200).json({
        message: 'Account exists and is unverified. Verification resent.',
        data: { exists: true, verified: false, resent: true, userId: existingUser._id },
      });
    }

    const newUser = new User({
      email: emailNorm || undefined,
      phone: phoneNorm || undefined,
      acceptedTerms: acceptedTerms !== false,
      roles: ['citizen'],
    });

    let rawPhoneCode = null;
    let rawEmailCode = null;

    if (phoneNorm) {
      rawPhoneCode = generateNumericCode(6);
      newUser.phoneVerificationCodeHash = hashPlain(rawPhoneCode);
      newUser.phoneVerificationExpires = new Date(Date.now() + OTP_EXPIRY_MS);
      newUser.phoneVerificationAttempts = 0;
      newUser.phoneVerificationSendCount = 1;
    }

    if (emailNorm) {
      rawEmailCode = generateNumericCode(6);
      newUser.emailVerificationCodeHash = hashPlain(rawEmailCode);
      newUser.emailVerificationExpires = new Date(Date.now() + EMAIL_OTP_EXPIRY_MS);
      newUser.emailVerificationAttempts = 0;
      newUser.emailVerificationSendCount = 1;
    }

    await newUser.save();

    if (phoneNorm && rawPhoneCode) await sendSmsOtp(phoneNorm, rawPhoneCode);
    if (emailNorm && rawEmailCode) await sendVerificationEmail(newUser, rawEmailCode);

    return res.status(201).json({
      message: 'Registered. Verification sent.',
      data: { userId: newUser._id, email: !!emailNorm, phone: !!phoneNorm, exists: false },
    });
  } catch (error) {
    console.error('register error:', error);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
}

export async function resendVerification(req, res) {
  try {
    const { type, identifier } = req.body;
    if (!type || !identifier) return res.status(400).json({ message: 'Missing type or identifier' });

    if (type === 'email') {
      const email = String(identifier).trim().toLowerCase();
      const user = await User.findOne({ email }).select('+emailVerificationCodeHash +emailVerificationExpires +emailVerificationAttempts');
      if (!user) return res.status(200).json({ message: 'If that email exists, a verification code will be sent.' });

      const code = generateNumericCode(6);
      user.emailVerificationCodeHash = hashPlain(code);
      user.emailVerificationExpires = new Date(Date.now() + EMAIL_OTP_EXPIRY_MS);
      user.emailVerificationAttempts = 0;
      user.emailVerificationSendCount = (user.emailVerificationSendCount || 0) + 1;
      await user.save();

      await sendVerificationEmail(user, code);
      return res.json({ message: 'Verification code resent.' });
    }

    if (type === 'phone') {
      const phone = String(identifier).trim();
      const user = await User.findOne({ phone }).select('+phoneVerificationCodeHash +phoneVerificationExpires +phoneVerificationAttempts');
      if (!user) return res.status(200).json({ message: 'If that phone exists, a verification code will be sent.' });

      const code = generateNumericCode(6);
      user.phoneVerificationCodeHash = hashPlain(code);
      user.phoneVerificationExpires = new Date(Date.now() + OTP_EXPIRY_MS);
      user.phoneVerificationAttempts = 0;
      user.phoneVerificationSendCount = (user.phoneVerificationSendCount || 0) + 1;
      await user.save();

      await sendSmsOtp(phone, code);
      return res.json({ message: 'Verification code resent.' });
    }

    return res.status(400).json({ message: 'Unknown verification type' });
  } catch (error) {
    console.error('resendVerification error:', error);
    return res.status(500).json({ message: 'Server error while resending verification.' });
  }
}

export async function verifyOtp(req, res) {
  try {
    const identifier = String(req.body.identifier || '').trim();
    const code = String(req.body.code || '').trim();

    if (!identifier || !code) return res.status(400).json({ message: 'Missing identifier or code' });

    const isEmail = identifier.includes('@');
    const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };

    const user = await User.findOne(query).select(
      '+phoneVerificationCodeHash +phoneVerificationExpires +phoneVerificationAttempts ' +
      '+emailVerificationCodeHash +emailVerificationExpires +emailVerificationAttempts ' +
      '+passwordResetToken +passwordResetExpires +passwordResetAttempts ' +
      '+isEmailVerified +isPhoneVerified +isVerified'
    );

    if (!user) return res.status(400).json({ message: 'Invalid code or user' });

    const now = new Date();
    const codeHash = hashPlain(code);

    if (user.passwordResetToken && user.passwordResetExpires && now < new Date(user.passwordResetExpires)) {
      if (codeHash !== user.passwordResetToken) {
        user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
        await user.save();
        return res.status(400).json({ message: 'Incorrect reset code.' });
      }

      if (isEmail) user.isEmailVerified = true;
      else user.isPhoneVerified = true;

      user.isVerified = true;
      user.verifiedAt = new Date();
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetAttempts = undefined;
      await user.save();

      return res.json({ message: 'Reset code verified.', userId: user._id, flowType: 'reset', token: code });
    }

    if (isEmail) {
      if (!user.emailVerificationCodeHash || !user.emailVerificationExpires || now > new Date(user.emailVerificationExpires)) {
        return res.status(400).json({ message: 'Verification code expired. Request a new one.' });
      }

      if (codeHash !== user.emailVerificationCodeHash) {
        user.emailVerificationAttempts = (user.emailVerificationAttempts || 0) + 1;
        await user.save();
        return res.status(400).json({ message: 'Incorrect verification code.' });
      }

      user.isEmailVerified = true;
      user.emailVerificationCodeHash = undefined;
      user.emailVerificationExpires = undefined;
      user.emailVerificationAttempts = undefined;
    } else {
      if (!user.phoneVerificationCodeHash || !user.phoneVerificationExpires || now > new Date(user.phoneVerificationExpires)) {
        return res.status(400).json({ message: 'Verification code expired. Request a new one.' });
      }

      if (codeHash !== user.phoneVerificationCodeHash) {
        user.phoneVerificationAttempts = (user.phoneVerificationAttempts || 0) + 1;
        await user.save();
        return res.status(400).json({ message: 'Incorrect verification code.' });
      }

      user.isPhoneVerified = true;
      user.phoneVerificationCodeHash = undefined;
      user.phoneVerificationExpires = undefined;
      user.phoneVerificationAttempts = undefined;
    }

    user.isVerified = true;
    user.verifiedAt = new Date();

    await user.save();

    return res.json({ message: 'Verified successfully.', userId: user._id });
  } catch (error) {
    console.error('verifyOtp error:', error);
    return res.status(500).json({ message: 'Server error during verification.' });
  }
}

export const verifyPhone = verifyOtp;

export async function createPassword(req, res) {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) return res.status(400).json({ message: 'Missing userId or password' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' });

    const user = await User.findById(userId).select('+passwordHash +isVerified +isEmailVerified +isPhoneVerified');
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isVerified && !(user.isEmailVerified || user.isPhoneVerified)) {
      return res.status(403).json({ message: 'User must verify contact before setting password.' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    await user.save();

    return res.json({ message: 'Password set successfully.' });
  } catch (error) {
    console.error('createPassword error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const identifier = String(req.body.identifier || req.body.email || req.body.phone || '').trim();
    const password = String(req.body.password || '');

    if (!identifier || !password) return res.status(400).json({ message: 'Missing credentials' });

    const query = identifier.includes('@') ? { email: identifier.toLowerCase() } : { phone: identifier };
    const user = await User.findOne(query).select('+passwordHash +refreshTokens');

    if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = signAccessToken({ userId: user._id, roles: user.roles });
    const refreshToken = signRefreshToken({ userId: user._id });

    const refreshHash = hashPlain(refreshToken);
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push({
      tokenHash: refreshHash,
      createdAt: new Date(),
      expiresAt: expiry,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    });

    await user.save();
    setRefreshCookie(res, refreshToken);

    return res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        profileComplete: user.profileComplete,
      },
    });
  } catch (error) {
    console.error('login error:', error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
}

export async function refreshTokenHandler(req, res) {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const tokenHash = hashPlain(token);

    const user = await User.findOne({ _id: payload.userId, 'refreshTokens.tokenHash': tokenHash });
    if (!user) return res.status(401).json({ message: 'Refresh token not recognized' });

    user.refreshTokens = user.refreshTokens.filter((rt) => rt.tokenHash !== tokenHash);

    const newRefreshToken = signRefreshToken({ userId: user._id });
    const newHash = hashPlain(newRefreshToken);
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    user.refreshTokens.push({
      tokenHash: newHash,
      createdAt: new Date(),
      expiresAt: newExpiry,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    });

    await user.save();

    const accessToken = signAccessToken({ userId: user._id, roles: user.roles });
    setRefreshCookie(res, newRefreshToken);

    return res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        profileComplete: user.profileComplete,
      },
    });
  } catch (error) {
    console.error('refreshTokenHandler error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.userId);
        if (user) {
          const tokenHash = hashPlain(token);
          user.refreshTokens = (user.refreshTokens || []).filter((rt) => rt.tokenHash !== tokenHash);
          await user.save();
        }
      } catch {}
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.json({ message: 'Logged out' });
  } catch (error) {
    console.error('logout error:', error);
    return res.status(500).json({ message: 'Server error during logout.' });
  }
}

export async function me(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    return res.json({
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        county: user.county,
        constituency: user.constituency,
        ward: user.ward,
        interests: user.interests,
        roles: user.roles,
        profileComplete: user.profileComplete,
        savedStations: user.savedStations,
      },
    });
  } catch (error) {
    console.error('me error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Missing email' });

    const emailNorm = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: emailNorm }).select('+passwordResetToken +passwordResetExpires +passwordResetAttempts');

    if (!user) {
      return res.status(200).json({ message: 'If that email is registered, a security code has been sent.' });
    }

    const otp = generateNumericCode(6);
    user.passwordResetToken = hashPlain(otp);
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    user.passwordResetAttempts = 0;
    await user.save();

    await sendPasswordResetEmail(user, otp);
    return res.json({ message: 'Security code sent.' });
  } catch (error) {
    console.error('requestPasswordReset error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { password, token, identifier } = req.body;
    if (!token || !password || !identifier) {
      return res.status(400).json({ message: 'Missing token, password, or identifier' });
    }

    const hashedToken = hashPlain(String(token).trim());
    const query = identifier.includes('@')
      ? { email: identifier.toLowerCase() }
      : { phone: identifier };

    const user = await User.findOne(query).select('+passwordResetToken +passwordResetExpires +passwordResetAttempts +passwordHash');
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset code.' });

    if (!user.passwordResetToken || !user.passwordResetExpires || new Date() > new Date(user.passwordResetExpires)) {
      return res.status(400).json({ message: 'Invalid or expired reset code.' });
    }

    if (hashedToken !== user.passwordResetToken) {
      user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid or expired reset code.' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetAttempts = undefined;
    user.passwordSetAt = new Date();

    await user.save();
    return res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('resetPassword error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export default {
  register,
  resendVerification,
  verifyOtp,
  verifyPhone,
  createPassword,
  login,
  refreshTokenHandler,
  logout,
  me,
  requestPasswordReset,
  resetPassword,
};