export const getRandomPosition = (radius, center) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = center[0];
  const centerY = center[1];

  let top, left;

  const angle = Math.random() * 2 * Math.PI;
  const r = Math.random() * radius;

  top = centerY + r * Math.sin(angle);
  left = centerX + r * Math.cos(angle);

  top = Math.max(40, Math.min(top, viewportHeight - 200));
  left = Math.max(0, Math.min(left, viewportWidth - 200));

  return { initialTop: top, initialLeft: left };
};
