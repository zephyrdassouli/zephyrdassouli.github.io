import { useState, useEffect, useCallback } from 'react';

let globalZIndex = 10;

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

    setPosition((prevPosition) => {
      let newTop = prevPosition.top;
      let newLeft = prevPosition.left;

      // Ensure window stays within bounds
      if (newTop + dimensions.height > viewportHeight) {
        newTop = viewportHeight - dimensions.height;
      }
      if (newLeft + dimensions.width > viewportWidth) {
        newLeft = viewportWidth - dimensions.width;
      }

      // Prevent negative positions
      newTop = Math.max(40, newTop);
      newLeft = Math.max(0, newLeft);

      return { top: newTop, left: newLeft };
    });
  }, [dimensions]);

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

      const newTop = clientY - dragOffset.y;
      const newLeft = clientX - dragOffset.x;

      const constrainedTop = Math.max(45, Math.min(newTop, viewportHeight - dimensions.height - 5));
      const constrainedLeft = Math.max(5, Math.min(newLeft, viewportWidth - dimensions.width - 5));

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
