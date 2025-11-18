export const getRandomPosition = (windowRef, setInitialPosition, sidebarVisible = false, isMobile = false) => {
  const { width, height } = windowRef.current.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate sidebar offset
  let sidebarWidth = 0;
  if (sidebarVisible && !isMobile) {
    sidebarWidth = 350; // Desktop sidebar width
  }
  // On mobile, when sidebar is visible, it takes full screen, so windows should be hidden
  if (sidebarVisible && isMobile) {
    // Position windows off-screen when mobile sidebar is open
    setInitialPosition({ initialTop: -1000, initialLeft: -1000 });
    return;
  }
  
  // Adjust available space to exclude sidebar
  const availableWidth = viewportWidth - sidebarWidth;
  const centerX = sidebarWidth + availableWidth / 2 - width / 2;
  const centerY = viewportHeight / 2 - height / 2;

  let top, left;

  const angle = Math.random() * 2 * Math.PI;
  const r = (Math.random() * Math.max(availableWidth, viewportHeight)) / 2; // Adjust the radius to avoid edges

  top = centerY + r * Math.sin(angle);
  left = centerX + r * Math.cos(angle);

  // Calculate the maximum allowed left position
  const maxLeft = sidebarWidth + availableWidth - width - 2;

  // Ensure windows stay within the main content area (right of sidebar)
  top = Math.max(10, Math.min(top, viewportHeight - height - 35));
  left = Math.max(sidebarWidth + 2, Math.min(left, maxLeft));

  setInitialPosition({ initialTop: top, initialLeft: left });
};
