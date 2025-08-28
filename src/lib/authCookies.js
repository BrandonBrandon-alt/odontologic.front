export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(/; */).reduce((acc, pair) => {
    if (!pair) return acc;
    const idx = pair.indexOf("=");
    if (idx < 0) return acc;
    const key = decodeURIComponent(pair.substring(0, idx).trim());
    const val = decodeURIComponent(pair.substring(idx + 1).trim());
    acc[key] = val;
    return acc;
  }, {});
}
