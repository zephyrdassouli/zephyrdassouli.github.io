'use client';
import { useDraggableWindow } from '@/utils/useDraggableWindow';
import { useAsciiTrail } from '@/utils/useAsciiTrail'; // Updated hook
import './windowStyle.css';
import { useState, useEffect } from 'react';

export default function Window({ children, title, width = 300, height = 300, initialTop, initialLeft, variant = 'default' }) {
  const { position, zIndex, dragListeners } = useDraggableWindow(width, height, initialTop, initialLeft);
  const { canvasRef, addTrail } = useAsciiTrail(); // Use the updated ASCII trail hook

  const [isVisible, setIsVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const handleXClick = () => {
    setFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  // Track the movement and add trail when the window is dragged
  useEffect(() => {
    addTrail(position, width, height); // Pass width and height for the full window trail
  }, [position, width, height]); // Every time the window position changes, add to trail

  if (isVisible) {
    return (
      <>
        <div
          className={`${variant == 'default' && 'bg-background pixel-border'} ${variant == 'blue' && 'bg-foreground pixel-border-blue'} ${fading && 'shrink-fade'} flex flex-col justify-center items-center p-[8px] pt-1`}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: zIndex,
          }}
        >
          <div className={`${variant == 'default' && 'bg-background'} ${variant == 'blue' && 'bg-foreground text-pblue'} w-full pt-2 pb-2 pr-1 flex justify-between cursor-move`} {...dragListeners}>
            <div className="font-black font">{title.toUpperCase()}</div>
            <button onClick={handleXClick} className="text-2xl relative bottom-1 px-2">
              x
            </button>
          </div>
          <div className={`${variant == 'default' && 'text-background bg-foreground'} ${variant == 'blue' && 'text-foreground bg-pblue'}  w-full h-full flex items-center justify-center p-4`}>{children}</div>
        </div>

        {/* ASCII Trail Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex - 1 }} />
      </>
    );
  }
}
