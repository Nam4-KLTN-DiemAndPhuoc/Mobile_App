export function passwordValidator(password) {
  if (!password) return "Chưa nhập mật khẩu";
  if (password.length < 6) return "Mật khẩu không hợp lệ";
  return "";
}
