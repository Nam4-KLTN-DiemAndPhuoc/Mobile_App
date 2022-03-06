export function passwordValidator(password) {
  if (!password) return "Chưa nhập mật khẩu";
  if (password.length < 6) return "Mật khẩu không hợp lệ";
}

export const password_CrfValidator = (password, password_Cfr) => {
  if (password !== password_Cfr)
    return "Mật khẩu xác nhận không giống mật khẩu";
  return "";
};
