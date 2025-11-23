'use client';
import { useState } from 'react';
import './linkPreviewStyle.css';

export default function LinkPreview({ handleClick, button, link, variant = 'default' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
    setFadingIn(true);
    setTimeout(() => {
      setFadingIn(false);
    }, 200);
  };

  const onMouseLeave = () => {
    setFadingOut(true);
    setTimeout(() => {
      setIsHovered(false);
      setFadingOut(false);
    }, 200);
  };

  // Get background color based on variant
  const getBgColor = () => {
    if (variant === 'blue') return 'bg-pblue';
    if (variant === 'inverted') return 'bg-background';
    return 'bg-foreground';
  };

  return (
    <>
      {/* Trigger button */}
      <button 
        onClick={handleClick} 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        className="h-full w-full text-left relative clickable border-0 outline-none p-0 m-0"
      >
        {button}
        
        {/* Link icon overlay */}
        {isHovered && (
          <div className={`absolute inset-0 flex items-center justify-center ${getBgColor()} bg-opacity-90 ${
            (fadingIn && 'link-preview-appear') || (fadingOut && 'link-preview-disappear')
          }`}>
            <img 
              src="/assets/link_arrow.png" 
              alt="Open link" 
              style={{ imageRendering: 'pixelated' }} 
              className="absolute top-2 right-2 w-10 h-10"
            />
            <div className="absolute bottom-2 left-2 text-xs text-foreground opacity-75">{link}</div>
          </div>
        )}
      </button>
    </>
  );
}
