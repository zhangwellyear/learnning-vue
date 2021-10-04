export function getCurrAuthority() {
  return ["admin"];
}

export function check(authority) {
  const current = getCurrAuthority();
  return current.some((item) => authority.includes(item));
}

export function isLogin() {
  const current = getCurrAuthority();
  return current && current[0] !== "guest";
}
