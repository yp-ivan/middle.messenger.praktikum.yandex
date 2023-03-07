export const escapeHTML = (unsafeText: string): string => {
  const div = document.createElement('div');
  div.innerText = unsafeText;
  return div.innerHTML;
};
