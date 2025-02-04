'use client';
import { useDraggableWindow } from '@/utils/useDraggableWindow';
import { useAsciiTrail } from '@/utils/useAsciiTrail'; // Updated hook
import './windowStyle.css';
import { useState, useEffect } from 'react';

export default function Window({ children, title, width = 300, height = 300, initialTop = 200, initialLeft = 200 }) {
  const { position, zIndex, dragListeners } = useDraggableWindow(width, height, initialTop, initialLeft);
  const { canvasRef, addTrail } = useAsciiTrail(); // Use the updated ASCII trail hook

  const [isVisible, setIsVisible] = useState(true);

  // Track the movement and add trail when the window is dragged
  useEffect(() => {
    addTrail(position, width, height); // Pass width and height for the full window trail
  }, [position, width, height]); // Every time the window position changes, add to trail

  if (isVisible) {
    return (
      <>
        <div
          className="bg-background flex flex-col justify-center items-center p-[8px] pt-1 pixel-border"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: zIndex,
          }}
        >
          <div className="bg-background text-foreground w-full pt-2 pb-2 pr-1 flex justify-between cursor-move" {...dragListeners}>
            <div>{title}</div>
            <button onClick={() => setIsVisible(false)} className="text-xl relative bottom-1">
              x
            </button>
          </div>
          <div className="text-background bg-foreground w-full h-full flex items-center justify-center p-4">{children}</div>
        </div>

        {/* ASCII Trail Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex - 1 }} />
      </>
    );
  }
}
