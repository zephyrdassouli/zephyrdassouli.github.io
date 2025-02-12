import { useState, useEffect, useCallback } from 'react';

let globalZIndex = 10; // Global z-index value to keep track of window stacking order

export const useDraggableWindow = (width, height, initialTop, initialLeft) => {
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(globalZIndex);

  // Ensure window stays inside viewport when resized
  const adjustPositionToFitViewport = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setPosition((prevPosition) => ({
      top: Math.max(40, Math.min(prevPosition.top, viewportHeight - height) - 1),
      left: Math.max(0, Math.min(prevPosition.left, viewportWidth - width) - 1),
    }));
  }, [width, height]);

  // Start dragging
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

  // Handle dragging
  const onDrag = useCallback(
    (e) => {
      if (!isDragging) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const newTop = e.clientY - dragOffset.y;
      const newLeft = e.clientX - dragOffset.x;

      // Constrain the position within the viewport
      const constrainedTop = Math.max(40, Math.min(newTop, viewportHeight - height) - 1);
      const constrainedLeft = Math.max(0, Math.min(newLeft, viewportWidth - width) - 1);

      setPosition({ top: constrainedTop, left: constrainedLeft });
    },
    [isDragging, dragOffset, width, height]
  );

  // Stop dragging
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Bind mouse events globally when dragging is in progress
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

  // Adjust position on window resize
  useEffect(() => {
    window.addEventListener('resize', adjustPositionToFitViewport);
    return () => {
      window.removeEventListener('resize', adjustPositionToFitViewport);
    };
  }, [adjustPositionToFitViewport]);

  return {
    position,
    zIndex,
    dragListeners: { onMouseDown: startDrag },
  };
};
