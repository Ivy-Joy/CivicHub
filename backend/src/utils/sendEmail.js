import nodemailer from 'nodemailer';

export async function sendVerificationEmail(user, code) {
  if (!process.env.SMTP_HOST) {
    console.log(`[DEV EMAIL] Verification code for ${user.email}: ${code}`);
    return { ok: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Verify your CivicHub account',
    text: `Your verification code is ${code}`,
  });

  return { ok: true };
}

export async function sendPasswordResetEmail(user, code) {
  if (!process.env.SMTP_HOST) {
    console.log(`[DEV EMAIL] Password reset code for ${user.email}: ${code}`);
    return { ok: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Reset your CivicHub password',
    text: `Your password reset code is ${code}`,
  });

  return { ok: true };
}