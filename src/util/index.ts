const ignoreCharList = [' ', '/n'];
const ignoreCharSet = new Set(ignoreCharList);

function isChar(c: string): boolean {
  const lowerC = c.toLowerCase();
  return lowerC >= 'a' && lowerC <= 'z';
}

function isNumber(c: string): boolean {
  return c >= '0' && c <= '9';
}

export default {
  validNormalChar: function(c: string): boolean {
    if (c.length !== 1) return false;
    return isChar(c) || isNumber(c);
  },

  
}

export function vaildIgnoreChar(c: string): boolean {
  if (c.length !== 1) return false;
  return ignoreCharSet.has(c);
}