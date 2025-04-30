'use client';
import { useDraggableWindow } from '@/utils/useDraggableWindow';
import { getRandomPosition } from '@/utils/windowPositioning';
import WindowVideo from './windowVideo';
import { useState, useRef, useEffect } from 'react';
import './windowStyle.css';
import WindowPhoto from './windowPhoto';

export default function Window({ children, className, title, variant = 'default', videoLink, photoLink, assetTitle }) {
  // Ref to get the window dimensions
  const windowRef = useRef(null);

  // Track window visibility and fading
  const [isVisible, setIsVisible] = useState(true);
  const [fading, setFading] = useState(false);

  // Set initial position using a function to ensure randomness
  const [initialPosition, setInitialPosition] = useState({ initialTop: 0, initialLeft: 0 });

  useEffect(() => {
    // Update the initial position when the component mounts or when the center changes
    getRandomPosition(windowRef, setInitialPosition);
  }, [windowRef]);

  // Ensure we have a valid position before rendering
  const { position, zIndex, dragListeners } = useDraggableWindow(windowRef, initialPosition.initialTop, initialPosition.initialLeft);

  // Handle close button click
  const handleXClick = () => {
    setFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={windowRef}
      className={`${variant === 'default' && 'bg-background pixel-border'} ${variant === 'blue' && 'bg-foreground pixel-border-blue'} ${variant === 'inverted' && 'bg-foreground pixel-border-inverted'} ${fading && 'shrink-fade'} ${className} flex flex-col justify-center items-center p-[8px] pt-1`}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: zIndex,
      }}
    >
      {/* Window Title Bar */}
      <div className={`${variant === 'default' && 'bg-background'} ${variant === 'blue' && 'bg-foreground text-pblue'} ${variant === 'inverted' && 'bg-foreground text-background'} w-full pt-2 pb-2 pr-1 flex justify-between cursor-move`} {...dragListeners}>
        <div className="font-black cursor-move">{title.toUpperCase()}</div>
        <button onClick={handleXClick} className="text-2xl relative bottom-1 px-2">
          x
        </button>
      </div>

      {/* Video or Photo or Content */}
      {videoLink ? (
        <WindowVideo title={assetTitle} videoLink={videoLink}>
          <div className={`${variant === 'default' && 'text-background bg-foreground'} ${variant === 'blue' && 'text-foreground bg-pblue'} ${variant === 'inverted' && 'text-foreground bg-background'} clickable w-full h-full flex items-center justify-start p-4 pt-8`}>{children}</div>
        </WindowVideo>
      ) : photoLink ? (
        <WindowPhoto title={assetTitle} photoLink={photoLink}>
          <div className={`${variant === 'default' && 'text-background bg-foreground'} ${variant === 'blue' && 'text-foreground bg-pblue'} ${variant === 'inverted' && 'text-foreground bg-background'} clickable w-full h-full flex items-center justify-start p-4 pt-8`}>{children}</div>
        </WindowPhoto>
      ) : (
        <div className={`${variant === 'default' && 'text-background bg-foreground'} ${variant === 'blue' && 'text-foreground bg-pblue'} ${variant === 'inverted' && 'text-foreground bg-background'} w-full h-full flex items-center justify-start p-4 pt-8`}>{children}</div>
      )}
    </div>
  );
}
