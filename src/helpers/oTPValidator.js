export function otpValidator(otp) {
  if (otp.length !== 6) return "OTP không hợp lệ";

  return "";
}
