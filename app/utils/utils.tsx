export const lowercasing = (text: string) => {
  return text.toLowerCase();
};

export const removeNumbers = (text: string) => {
  return text.replace(/['^0-9']/g, "");
};

export const removePunctuation = (text: string) => {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
};

export const removeSpecialCharacters = (text: string) => {
  return text.replace(/[^a-zA-Z0-9]/g, "");
};

export const matchRegexPattern = (text: string, pattern: string) => {
  return text.replace(new RegExp(pattern, "g"), "");
};
