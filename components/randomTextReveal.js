'use client';

import { useState, useEffect } from 'react';

export default function RandomTextReveal({ text, duration = 1000, className }) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const getRandomString = (length) => Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');

  const [displayText, setDisplayText] = useState(''.padEnd(text.length, ' '));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDisplayText(getRandomString(text.length));
  }, []);

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
