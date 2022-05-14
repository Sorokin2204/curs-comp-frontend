export const phoneFormat = (phone) => {
  if (!phone) return '';
  const phoneStr = phone.toString();

  return `+375(${phoneStr[0]}${phoneStr[1]}) ${phoneStr[2]}${phoneStr[3]}${phoneStr[4]}-${phoneStr[5]}${phoneStr[6]}-${phoneStr[7]}${phoneStr[8]}`;
};
