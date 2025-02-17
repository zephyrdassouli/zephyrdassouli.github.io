import { useState, useEffect, useCallback } from 'react';

let globalZIndex = 10; // Global z-index value to keep track of window stacking order

export const useDraggableWindow = (windowRef, initialTop, initialLeft) => {
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
  // Track dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Track z-index
  const [zIndex, setZIndex] = useState(globalZIndex);

  // Ensure window stays inside viewport when resized
  const adjustPositionToFitViewport = useCallback(() => {
    // If dimensions are not set, do nothing
    if (!dimensions.width || !dimensions.height) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setPosition((prevPosition) => {
      const newTop = Math.max(40, Math.min(prevPosition.top, viewportHeight - dimensions.height) - 1);
      const newLeft = Math.max(0, Math.min(prevPosition.left, viewportWidth - dimensions.width) - 1);

      // Only update position if it actually changes
      if (newTop !== prevPosition.top || newLeft !== prevPosition.left) {
        return { top: newTop, left: newLeft };
      }
      return prevPosition;
    });
  }, [dimensions]);

  // Adjust position when window is resized
  useEffect(() => {
    const handleResize = () => adjustPositionToFitViewport();
    window.addEventListener('resize', handleResize);
    adjustPositionToFitViewport(); // Initial adjustment
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustPositionToFitViewport]);

  const startDrag = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.left,
        y: e.clientY - position.top,
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

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const newTop = e.clientY - dragOffset.y;
      const newLeft = e.clientX - dragOffset.x;

      const constrainedTop = Math.max(40, Math.min(newTop, viewportHeight - dimensions.height) - 1);
      const constrainedLeft = Math.max(0, Math.min(newLeft, viewportWidth - dimensions.width) - 1);

      setPosition({ top: constrainedTop, left: constrainedLeft });
    },
    [isDragging, dragOffset, dimensions]
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging, onDrag, stopDrag]);

  return {
    position,
    zIndex,
    dragListeners: { onMouseDown: startDrag },
  };
};
