'use client';
import { useState, useEffect } from 'react';
import './videoPreviewStyle.css';

export default function VideoPreview({ handleOpen, button, videoLink }) {
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
      setHoverPosition({ x: e.clientX + 25, y: e.clientY + 40 });
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
          className={`${fadingOut && 'preview-disappear'} ${fadingIn && 'preview-appear'} preview-pixel-border fixed w-[120px] h-auto rounded-sm shadow-lg pointer-events-none video-overlay`}
          style={{
            top: `${hoverPosition.y}px`,
            left: `${hoverPosition.x}px`,
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
