import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const RefreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    userAgent: String,
    ip: String,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    phone: { type: String, trim: true, unique: true, sparse: true },
    passwordHash: { type: String, select: false },

    acceptedTerms: { type: Boolean, default: true },

    firstName: { type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    county: { type: String, trim: true, default: '' },
    constituency: { type: String, trim: true, default: '' },
    ward: { type: String, trim: true, default: '' },
    interests: [{ type: String }],

    roles: [{ type: String, default: 'citizen' }],
    profileComplete: { type: Boolean, default: false },

    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },

    emailVerificationCodeHash: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    emailVerificationAttempts: { type: Number, select: false, default: 0 },
    emailVerificationSendCount: { type: Number, default: 0 },

    phoneVerificationCodeHash: { type: String, select: false },
    phoneVerificationExpires: { type: Date, select: false },
    phoneVerificationAttempts: { type: Number, select: false, default: 0 },
    phoneVerificationSendCount: { type: Number, default: 0 },

    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    passwordResetAttempts: { type: Number, select: false, default: 0 },

    savedStations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' }],
    followedLeaders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leader' }],
    refreshTokens: [RefreshTokenSchema],
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (candidatePassword) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

UserSchema.statics.hashToken = function (value) {
  return bcrypt.hashSync(String(value), 8);
};

export default mongoose.model('User', UserSchema);