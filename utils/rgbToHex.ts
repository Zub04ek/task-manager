export const RGBToHex = (rgbStr: string): string => {
  const matches = rgbStr.match(/\d+/g);
  if (matches) {
    const [r, g, b] = matches.map(Number);
    const hex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    return `#${hex}`;
  } else {
    return '';
  }
};
