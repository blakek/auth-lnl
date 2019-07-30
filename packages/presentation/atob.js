function atob(text) {
  if (typeof window === 'undefined') {
    return Buffer.from(text, 'base64').toString();
  }
  return window.atob(text);
}

export default atob;
