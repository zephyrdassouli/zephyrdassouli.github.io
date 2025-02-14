'use client';

import { useState, useEffect } from 'react';

export default function TextHeader({ text, duration, className }) {
  // Characters to use for the effect
  const characters = '!@#$%^&*';

  // State to track the displayed text
  const [displayText, setDisplayText] = useState(text);
  // State to track if the text is hovered
  const [hovered, setHovered] = useState(false);

  // Effect to animate the text on hover
  useEffect(() => {
    let interval;

    if (hovered) {
      let startTime = Date.now();
      // Animate the text with random characters
      interval = setInterval(() => {
        let elapsed = Date.now() - startTime;

        // Calculate the progress of the animation
        let progress = Math.min(1, elapsed / duration);

        // Replace the characters with random characters
        let newText = text
          .split('')
          .map((char, i) => (Math.random() < progress ? char : characters[Math.floor(Math.random() * characters.length)]))
          .join('');

        setDisplayText(newText);

        if (progress >= 1) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 50);

      // If the text is not hovered, animate back to the original text
    } else {
      interval = setInterval(() => {
        setDisplayText((prev) => {
          // Replace the characters with the original text
          let newText = prev
            .split('')
            .map((char, i) => (char === text[i] ? char : text[i]))
            .join('');

          // If the text is back to the original, clear the interval
          if (newText === text) {
            clearInterval(interval);
            return text;
          }
          return newText;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [hovered, text, duration]);

  return (
    <span
      style={{
        whiteSpace: 'pre-line',
        width: 'fit-content',
      }}
      className={`${className} transition-colors duration-150 clickable ${hovered ? 'text-pblue' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {displayText}
    </span>
  );
}
