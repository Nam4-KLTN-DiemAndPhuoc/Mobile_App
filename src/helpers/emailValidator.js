export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email chưa được nhập";
  if (!re.test(email)) return "Email không hợp lệ";
  return "";
}

export function phoneValidator(phone) {
  const re = /((09|03|07|08|05)+([0-9]{8})\b)/;

  if (!phone) {
    return "Chưa nhập số điện thoại";
  }
  if (!re.test(phone)) return "Số điện thoại không hợp lệ";

  return "";
}
