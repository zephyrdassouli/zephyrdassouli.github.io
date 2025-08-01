'use client';
import { useState, useEffect } from 'react';

export default function RetroLoading({ onComplete, speedMultiplier = 1 }) {
  const [loadingText, setLoadingText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');
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
  const stepInterval = Math.floor(400 / speedMultiplier);
  const typeSpeed = Math.floor(25 / speedMultiplier);
  const dotSpeed = Math.floor(300 / speedMultiplier);
  const finalDelay = Math.floor(500 / speedMultiplier);
  const completeDelay = Math.floor(300 / speedMultiplier);
  const minTotalTime = Math.floor(2500 / speedMultiplier);

  // Total animation time calculation
  const totalAnimationTime = (loadingSteps.length - 1) * 400 + 500; // Steps + final delay

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

  return (
    <div 
      className={`fixed inset-0 bg-background z-50 transition-opacity duration-500 ${
        (isComplete && animationComplete) ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* TTY-style terminal in top left */}
      <div className="absolute top-4 left-4 text-foreground text-sm">
        <div className="mb-2">arch@zeph:~$</div>
        {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
          <div key={index} className="mb-1">
            <span className="text-pblue">[</span>
            <span className="text-pblue">OK</span>
            <span className="text-pblue">]</span>
            <span className="ml-2">
              {index === currentStep && index < loadingSteps.length - 1 ? 
                loadingText : step}
            </span>
            {index === currentStep && !isComplete && <span className="animate-pulse">_</span>}
            {index === loadingSteps.length - 1 && currentStep === index && (
              <span className="text-pblue ml-2">DONE</span>
            )}
          </div>
        ))}
        {/* Show system ready message when complete */}
        {isComplete && (
          <div className="mt-2 text-pblue">
            <span>Welcome !</span>
          </div>
        )}
      </div>


      {/* Grain effect on top of everything */}
      <div className="fixed z-30">
        <div className="tv-grain" />
      </div>
    </div>
  );
}
