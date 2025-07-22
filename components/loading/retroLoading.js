'use client';
import { useState, useEffect } from 'react';

export default function RetroLoading({ onComplete, speedMultiplier = 1 }) {
  const [loadingText, setLoadingText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const loadingSteps = [
    'Loading kernel modules',
    'Mounting filesystems',
    'Starting network daemon',
    'Initializing user session',
    'Loading desktop environment'
  ];

  // Adjust timing based on speed multiplier
  const stepInterval = Math.floor(800 / speedMultiplier);
  const typeSpeed = Math.floor(50 / speedMultiplier);
  const dotSpeed = Math.floor(500 / speedMultiplier);
  const progressSpeed = Math.floor(150 / speedMultiplier);
  const finalDelay = Math.floor(1000 / speedMultiplier);
  const completeDelay = Math.floor(1500 / speedMultiplier);
  const minTotalTime = Math.floor(5000 / speedMultiplier);

  // Total animation time calculation
  const totalAnimationTime = (loadingSteps.length - 1) * 800 + 1000; // Steps + final delay

  useEffect(() => {
    const stepIntervalId = setInterval(() => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setLoadingText('');
      } else {
        clearInterval(stepIntervalId);
        setTimeout(() => {
          setIsComplete(true);
          // Wait a bit more before marking animation as complete
          setTimeout(() => {
            setAnimationComplete(true);
          }, completeDelay);
        }, finalDelay);
      }
    }, stepInterval);

    return () => clearInterval(stepIntervalId);
  }, [currentStep, stepInterval, finalDelay, completeDelay]);

  // Only call onComplete when both animation and minimum time are done
  useEffect(() => {
    if (isComplete && animationComplete) {
      setTimeout(() => onComplete?.(), 500);
    }
  }, [isComplete, animationComplete, onComplete]);

  // Ensure minimum total loading time
  useEffect(() => {
    const minTimeTimer = setTimeout(() => {
      // Only set animation complete if the steps are also complete
      if (isComplete) {
        setAnimationComplete(true);
      }
    }, minTotalTime);

    return () => clearTimeout(minTimeTimer);
  }, [isComplete, minTotalTime]);

  useEffect(() => {
    if (currentStep < loadingSteps.length - 1) {
      const text = loadingSteps[currentStep];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= text.length) {
          setLoadingText(text.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, typeSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep, typeSpeed]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, dotSpeed);

    return () => clearInterval(dotInterval);
  }, [dotSpeed]);

  useEffect(() => {
    const startTimeRef = Date.now();
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Calculate target progress based on time elapsed
        const targetProgress = Math.min(100, (Date.now() - startTimeRef) / minTotalTime * 100);
        const increment = Math.random() * 8 + 2; // Random increment between 2-10
        const newProgress = Math.min(targetProgress, prev + increment);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, progressSpeed);

    return () => clearInterval(progressInterval);
  }, [minTotalTime, progressSpeed]);

  return (
    <div 
      className={`fixed inset-0 bg-background z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        (isComplete && animationComplete) ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Retro Computer Frame */}
      <div className="pixel-border-blue bg-background p-8 sm:max-w-md max-w-[90%] w-full mx-4 relative z-10">
        {/* Screen Header */}
        <div className="text-center text-pblue mb-6">
          <div className="text-xs opacity-75 mb-2">GNU GRUB</div>
          <div className="text-lg font-bold">ZEPHYR DASSOULI</div>
          <div className="text-xs opacity-75 mt-1">Booting ...</div>
        </div>

        {/* Terminal-like loading area */}
        <div className="bg-black bg-opacity-75 text-pblue p-4 text-xs min-h-48">
          <div className="mb-2 text-foreground">arch@zeph:~$</div>
          {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className="mb-1">
              <span className="text-pblue">[</span>
              <span className="text-pblue">OK</span>
              <span className="text-pblue">]</span>
              <span className="text-foreground ml-2">
                {index === currentStep && index < loadingSteps.length - 1 ? 
                  loadingText : step}
              </span>
              {index === currentStep && !isComplete && <span className="animate-pulse text-foreground">_</span>}
              {index === currentStep && index < loadingSteps.length - 1 && (
                <span className="text-pblue">{dots}</span>
              )}
              {index === loadingSteps.length - 1 && currentStep === index && (
                <span className="text-pblue ml-2">DONE</span>
              )}
            </div>
          ))}
          {/* Show system ready message when complete */}
          {isComplete && (
            <div className="mt-2 text-pblue">
              <span>Welcome!</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-pblue mb-1">
            <span>BOOT PROGRESS</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="border border-pblue h-3 bg-background">
            <div 
              className="h-full bg-pblue transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Blinking cursor at bottom */}
        <div className="mt-4 text-center">
          <span className="text-pblue text-xs animate-pulse">
            Press Enter to continue...
          </span>
        </div>
      </div>

      {/* Grain effect on top of everything */}
      <div className="fixed z-30">
        <div className="tv-grain" />
      </div>
    </div>
  );
}
