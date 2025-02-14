'use client';

import { useState, useEffect } from 'react';

export default function RandomTextReveal({ text, duration = 2000, className }) {
  // Characters to use for the random text
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  // Function to generate a random string of a given length
  const getRandomString = (length) => Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');

  // State to store the current display text
  const [displayText, setDisplayText] = useState(''.padEnd(text.length, ' '));
  // State to track if the component has mounted
  const [mounted, setMounted] = useState(false);

  // Set the initial display text on mount and reveal the actual text over time
  useEffect(() => {
    setMounted(true);
    setDisplayText(getRandomString(text.length));
  }, []);

  // Reveal the actual text over time
  useEffect(() => {
    if (!mounted) return;
    let startTime = Date.now();
    let interval = setInterval(() => {
      let elapsed = Date.now() - startTime;
      let progress = Math.min(1, elapsed / duration);

      let newText = text
        .split('')
        .map((char, i) => {
          if (Math.random() < progress) {
            return char; // Reveal actual character
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(newText);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [mounted, text, duration]);

  return (
    <span style={{ whiteSpace: 'pre-line', width: 'fit-content' }} className={className}>
      {displayText}
    </span>
  );
}
