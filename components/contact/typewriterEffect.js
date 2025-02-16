'use client';
import './typewriterEffectStyle.css';
import { useEffect, useState } from 'react';

export default function TypewriterEffect({ className, text, delay = 1500 }) {
  // Display text with a blinking cursor
  const [displayText, setDisplayText] = useState("<span class='blinker'>&#32;</span>");
  // Display copied message
  const [copied, setCopied] = useState(false);
  // Cursor position
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // Fade out copied message
  const [fadeOut, setFadeOut] = useState(false);

  // Typing effect with blinking cursor
  useEffect(() => {
    let i = 0;
    let isTag = false;
    let typingTimer;

    const type = () => {
      const currentText = text.slice(0, ++i);
      setDisplayText(currentText + `<span class='blinker'>&#32;</span>`);
      const char = currentText.slice(-1);

      if (char === '<') isTag = true;
      if (char === '>') isTag = false;

      if (isTag) {
        typingTimer = setTimeout(type, 0);
        return;
      }

      if (currentText === text) return;

      typingTimer = setTimeout(type, 60);
    };

    const startTyping = setTimeout(type, delay);

    return () => {
      clearTimeout(startTyping);
      clearTimeout(typingTimer);
    };
  }, [text, delay]);

  // Copy email to clipboard and display a message
  const handleCopy = (e) => {
    if (copied) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setFadeOut(false);

    // Get cursor position

    setCursorPos({ x: e.clientX, y: e.clientY });

    setTimeout(() => setFadeOut(true), 1000);
    // Hide the message after 1.5 seconds
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <span onClick={handleCopy} className={`typing clickable cursor-pointer ${className}`} dangerouslySetInnerHTML={{ __html: displayText }} />
      {copied && (
        <span className={`copied-message ${fadeOut ? 'fade-out' : ''}`} style={{ top: cursorPos.y - 40, left: cursorPos.x - 55 }}>
          Email copied !
        </span>
      )}
    </>
  );
}
