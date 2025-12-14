export const getValidCharsForBase = (base: number): string => {
  if (base < 2 || base > 64) {
    return "";
  }

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
  return chars.slice(0, base);
};

const getValidInput = (base: number, input: string) => {
  if (base < 2 || base > 64) {
    return { validInput: "", hasInvalidChars: false, validChars: "" };
  }

  const validChars = getValidCharsForBase(base);
  const pattern = new RegExp(`[^${validChars}]`, 'gi');
  const validInput = input.replace(pattern, '');
  const hasInvalidChars = validInput !== input;

  return { validInput, hasInvalidChars, validChars };
};

export default getValidInput;
