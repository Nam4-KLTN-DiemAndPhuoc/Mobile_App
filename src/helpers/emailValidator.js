export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email chưa được nhập";
  if (!re.test(email)) return "Email không hợp lệ";
  return "";
}
