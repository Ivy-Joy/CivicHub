//backend/src/utils/sendSms.js
export async function sendSmsOtp(phone, code) {
  console.log(`[DEV SMS] OTP for ${phone}: ${code}`);
  return { ok: true };
}