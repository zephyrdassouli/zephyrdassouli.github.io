'use client';
import { useDraggableWindow } from '@/utils/useDraggableWindow';
import { useAsciiTrail } from '@/utils/useAsciiTrail'; // Updated hook
import WindowVideo from './windowVideo';
import './windowStyle.css';
import { useState, useEffect } from 'react';

export default function Window({ children, title, width = 300, height = 300, initialTop, initialLeft, variant = 'default', videoLink, videoTitle }) {
  // Use the draggable window hook to get the position, zIndex, and drag listeners
  const { position, zIndex, dragListeners } = useDraggableWindow(width, height, initialTop, initialLeft);
  const { canvasRef, addTrail } = useAsciiTrail(); // Use the updated ASCII trail hook

  // State to track if the window is visible and fading
  const [isVisible, setIsVisible] = useState(true);
  const [fading, setFading] = useState(false);

  // Handle the window close button
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
          className={`${variant == 'default' && 'bg-background pixel-border'} ${variant == 'blue' && 'bg-foreground pixel-border-blue'} ${variant == 'inverted' && 'bg-foreground pixel-border-inverted'} ${fading && 'shrink-fade'} flex flex-col justify-center items-center p-[8px] pt-1`}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: zIndex,
          }}
        >
          <div className={`${variant == 'default' && 'bg-background'} ${variant == 'blue' && 'bg-foreground text-pblue'} ${variant == 'inverted' && 'bg-foreground text-background'} w-full pt-2 pb-2 pr-1 flex justify-between cursor-move`} {...dragListeners}>
            <div className="font-black cursor-move">{title.toUpperCase()}</div>
            <button onClick={handleXClick} className="text-2xl relative bottom-1 px-2">
              x
            </button>
          </div>
          {videoLink && (
            <WindowVideo title={videoTitle} videoLink={videoLink}>
              <div className={`${variant == 'default' && 'text-background bg-foreground'} ${variant == 'blue' && 'text-foreground bg-pblue'} ${variant == 'inverted' && 'text-foreground bg-background'} clickable w-full h-full flex items-center justify-start p-4 pt-8`}>{children}</div>
            </WindowVideo>
          )}
          {!videoLink && <div className={`${variant == 'default' && 'text-background bg-foreground'} ${variant == 'blue' && 'text-foreground bg-pblue'} ${variant == 'inverted' && 'text-foreground bg-background'}  w-full h-full flex items-center justify-start p-4 pt-8`}>{children}</div>}
        </div>

        {/* ASCII Trail Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex - 1 }} />
      </>
    );
  }
}
