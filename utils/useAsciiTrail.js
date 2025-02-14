import { useEffect, useRef } from 'react';

export function useAsciiTrail() {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);

  const asciiChars = '%$@#*';
  const trailLifespan = 20; // lifespan of each trail item in frames
  const asciiColor = '#EADEB6'; // The desired color for the ASCII characters
  const verticalOffset = 80; // Vertical offset to lower the trail (adjust this value)
  const horizontalOffset = -10; // Horizontal offset to shift the trail (adjust this value)

  useEffect(() => {
    // Get the canvas and its context
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.pointerEvents = 'none';

    function drawTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Remove trail items that have expired (their life has reached zero)
      trailRef.current = trailRef.current.filter((trailItem) => trailItem.life > 0);

      // Set font to custom Acer_VGA font
      ctx.font = '16px "Acer_VGA", monospace'; // Use your custom font here
      ctx.fillStyle = asciiColor;

      // Draw the trail with fading effect and lifespan
      trailRef.current.forEach((trailItem) => {
        ctx.globalAlpha = trailItem.life / trailLifespan; // Fading effect

        // Use the stored character for the trail (it doesn't change)
        ctx.fillText(trailItem.char, trailItem.x, trailItem.y);

        // Decrease life of the trail point
        trailItem.life -= 1;
      });

      requestAnimationFrame(drawTrail);
    }

    drawTrail();

    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  function addTrail(position, width, height, leftOffset = 0, topOffset = 0) {
    // Track the trail for the entire window's area
    const trailPoints = [];
    // Increase the step size to reduce the density
    const stepSize = 90; // Increase this value to reduce the density of characters

    // Generate trail points with random positioning within the window
    for (let x = position.left; x < position.left + width; x += stepSize) {
      for (let y = position.top + verticalOffset; y < position.top + height; y += stepSize) {
        // Choose a random character from asciiChars
        const char = asciiChars[Math.floor(Math.random() * asciiChars.length)];

        // Clamp the x and y positions to ensure they stay within the window boundaries
        const clampedX = Math.min(Math.max(x + Math.random() * stepSize - stepSize / 2 + leftOffset + horizontalOffset, position.left), position.left + width);
        const clampedY = Math.min(Math.max(y + Math.random() * stepSize - stepSize / 2 + topOffset, position.top), position.top + height);

        trailPoints.push({
          x: clampedX, // Clamped x position with left and horizontal offset
          y: clampedY, // Clamped y position with vertical and top offset
          char: char, // Store the chosen character
          life: trailLifespan, // Set initial life of the trail item
        });
      }
    }

    // Add the trail points to the trailRef
    trailRef.current = [...trailRef.current, ...trailPoints];
  }

  function onWindowResize() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  return { canvasRef, addTrail };
}
