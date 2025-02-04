export const getRandomPosition = (radius, width, height, center) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = center[0];
  const centerY = center[1];

  let top, left;

  const angle = Math.random() * 2 * Math.PI;
  const r = Math.random() * radius;

  top = centerY + r * Math.sin(angle) - height / 2;
  left = centerX + r * Math.cos(angle) - width / 2;

  top = Math.max(0, Math.min(top, viewportHeight - height));
  left = Math.max(160, Math.min(left, viewportWidth - width));

  return { initialTop: top, initialLeft: left };
};
