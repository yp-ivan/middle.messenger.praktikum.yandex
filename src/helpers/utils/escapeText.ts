export const removeQuote = (text: string): string => {
  const reg = /"/ig;
  return text.replace(reg, '\'');
};

export const escapeHTML = (unsafeText: string): string => {
  const div = document.createElement('div');
  div.innerText = unsafeText;
  return div.innerHTML;
};
