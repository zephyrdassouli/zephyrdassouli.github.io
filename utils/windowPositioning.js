export const getRandomPosition = (windowRef, setInitialPosition) => {
  const { width, height } = windowRef.current.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const centerX = viewportWidth / 2 - width / 2;
  const centerY = viewportHeight / 2 - height / 2;

  let top, left;

  const angle = Math.random() * 2 * Math.PI;
  const r = (Math.random() * Math.max(viewportWidth, viewportHeight)) / 2; // Adjust the radius to avoid edges

  top = centerY + r * Math.sin(angle);
  left = centerX + r * Math.cos(angle);


  top = Math.max(45, Math.min(top, viewportHeight - height - 5));
  left = Math.max(5, Math.min(left, viewportWidth - width - 5));

  setInitialPosition({ initialTop: top, initialLeft: left });
};
