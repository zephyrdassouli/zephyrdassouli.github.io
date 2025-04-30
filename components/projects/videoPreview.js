'use client';
import { useState, useEffect } from 'react';
import './videoPreviewStyle.css';

export default function VideoPreview({ handleOpen, button, videoLink, windowPosition }) {
  // Hover position for the video (on the cursor)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  // Tracks if the cursor is hovering the button
  const [isHovered, setIsHovered] = useState(false);

  // Preview fade in/out control
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  // Update the hover position on mouse move
  useEffect(() => {
    const updateMousePosition = (e) => {
      setHoverPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Handles the opening of the modal
  const onMouseEnter = () => {
    setIsHovered(true);
    setFadingIn(true);
    setTimeout(() => {
      setFadingIn(false);
    }, 200);
  };

  // Handles the closing of the modal
  const onMouseLeave = () => {
    setFadingOut(true);
    setTimeout(() => {
      setIsHovered(false);
      setFadingOut(false);
    }, 200);
  };

  return (
    <>
      {/* Trigger button */}
      <button onClick={handleOpen} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="h-full w-full text-left">
        {button}
      </button>

      {/* Preview video */}
      {isHovered && (
        <video
          className={`${fadingOut && 'preview-disappear'} ${fadingIn && 'preview-appear'} preview-pixel-border w-[120px] h-auto rounded-sm shadow-lg pointer-events-none`}
          style={{
            top: `${hoverPosition.y - windowPosition.top + 40}px`,
            left: `${hoverPosition.x - windowPosition.left + 25}px`,
            position: 'absolute',
            zIndex: 1000,
          }}
          autoPlay
          loop
          muted
        >
          <source src={videoLink} />
        </video>
      )}
    </>
  );
}
