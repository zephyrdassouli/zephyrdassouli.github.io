export const getRandomPosition = (windowRef, setInitialPosition) => {
  const { width, height } = windowRef.current.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const sidebarWidth = 350; // Width of the security research sidebar
  
  // Adjust available space to exclude sidebar
  const availableWidth = viewportWidth - sidebarWidth;
  const centerX = sidebarWidth + availableWidth / 2 - width / 2;
  const centerY = viewportHeight / 2 - height / 2;

  let top, left;

  const angle = Math.random() * 2 * Math.PI;
  const r = (Math.random() * Math.max(availableWidth, viewportHeight)) / 2; // Adjust the radius to avoid edges

  top = centerY + r * Math.sin(angle);
  left = centerX + r * Math.cos(angle);

  // Ensure windows stay within the main content area (right of sidebar)
  top = Math.max(45, Math.min(top, viewportHeight - height - 5));
  left = Math.max(sidebarWidth + 5, Math.min(left, viewportWidth - width - 5));

  setInitialPosition({ initialTop: top, initialLeft: left });
};
