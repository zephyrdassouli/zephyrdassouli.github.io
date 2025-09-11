import { useState, useEffect, useCallback } from 'react';

let globalZIndex = 10;

export const useDraggableWindow = (windowRef, initialTop, initialLeft, sidebarVisible = false, isMobile = false) => {
  // Get dimensions of the window
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  // Update dimensions when window is resized
  const updateDimensions = () => {
    if (windowRef.current) {
      const { width, height } = windowRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  // Update dimensions on mount
  useEffect(() => {
    updateDimensions();
  }, []);

  // Track window position
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });

  useEffect(() => {
    setPosition({ top: initialTop, left: initialLeft });
  }, [initialTop, initialLeft]);

  // Track dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Track z-index
  const [zIndex, setZIndex] = useState(globalZIndex);

  // Ensure window stays inside viewport when resized
  const adjustPositionToFitViewport = useCallback(() => {
    if (!dimensions.width || !dimensions.height) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate sidebar offset
    let sidebarWidth = 0;
    if (sidebarVisible && !isMobile) {
      sidebarWidth = 350; // Desktop sidebar width
    }

    setPosition((prevPosition) => {
      let newTop = prevPosition.top;
      let newLeft = prevPosition.left;

      // Calculate available width for windows (viewport minus sidebar)
      const availableWidth = viewportWidth - sidebarWidth;
      const maxLeft = sidebarWidth + availableWidth - dimensions.width;

      // Ensure window stays within bounds (excluding sidebar area)
      if (newTop + dimensions.height > viewportHeight) {
        newTop = viewportHeight - dimensions.height;
      }
      if (newLeft + dimensions.width > viewportWidth) {
        newLeft = maxLeft;
      }

      // Prevent negative positions and sidebar overlap
      newTop = Math.max(10, Math.min(newTop, viewportHeight - dimensions.height - 35));
      newLeft = Math.max(sidebarWidth + 2, Math.min(newLeft, maxLeft)); // Don't allow windows to go into sidebar area

      return { top: newTop, left: newLeft };
    });
  }, [dimensions, sidebarVisible, isMobile]);

  // Adjust position when window is resized
  useEffect(() => {
    const handleResize = () => adjustPositionToFitViewport();
    window.addEventListener('resize', handleResize);
    adjustPositionToFitViewport();
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustPositionToFitViewport]);

  const startDrag = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      setDragOffset({
        x: clientX - position.left,
        y: clientY - position.top,
      });

      // Bring window to front by increasing zIndex
      setZIndex(++globalZIndex);
    },
    [position]
  );

  // Drag window
  const onDrag = useCallback(
    (e) => {
      if (!isDragging) return;

      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate sidebar offset
      let sidebarWidth = 0;
      if (sidebarVisible && !isMobile) {
        sidebarWidth = 350; // Desktop sidebar width
      }

      const newTop = clientY - dragOffset.y;
      const newLeft = clientX - dragOffset.x;

      // Calculate available width for windows (viewport minus sidebar)
      const availableWidth = viewportWidth - sidebarWidth;
      const maxLeft = sidebarWidth + availableWidth - dimensions.width - 2;

      // Constrain windows to stay in main content area (right of sidebar)
      const constrainedTop = Math.max(10, Math.min(newTop, viewportHeight - dimensions.height - 35));
      const constrainedLeft = Math.max(sidebarWidth + 2, Math.min(newLeft, maxLeft));

      setPosition({ top: constrainedTop, left: constrainedLeft });
    },
    [isDragging, dragOffset, dimensions, sidebarVisible, isMobile]
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);

      window.addEventListener('touchmove', onDrag);
      window.addEventListener('touchend', stopDrag);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);

      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);

      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, onDrag, stopDrag]);

  return {
    position,
    zIndex,
    dragListeners: { onMouseDown: startDrag, onTouchStart: startDrag },
  };
};
