'use client';
import { useState, useEffect, useRef } from 'react';
import RandomTextReveal from '@/components/randomTextReveal';

export default function CV() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // Add scrolling throttle state
  const scrollContainerRef = useRef(null);
  const thumbRef = useRef(null);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  // Professional experiences data
  const experiences = [
    {
      id: 5,
      title: "Consulting Intern",
      company: "SQLI",
      period: "Sep 2025 - Current",
      location: "Toulouse, France",
      description: "Contribution to the design, development and deployment of generative AI solutions within SQLI’s consulting division",
      skills: ["Consulting", "AI/ML", "Architecture"]
    },
    {
      id: 4,
      title: "Research Intern",
      company: "University of Amsterdam",
      period: "Apr 2025 - Jul 2025",
      location: "Amsterdam, Netherlands",
      description: "Research in the Multiscale Networked Systems group focusing on blockchain integration to secure AI training workflows",
      skills: ["Blockchain", "AI/ML", "Cybersecurity"]
    },
    {
      id: 3,
      title: "Engineering Intern",
      company: "MecaOctet",
      period: "Jun 2024 - Jul 2024",
      location: "Toulouse, France",
      description: "Design and implementation of an IoT solution to update an outdated product",
      skills: ["Linux", "IoT", "Modbus", "Python"]
    },
    {
      id: 2,
      title: "Master Student",
      company: "IMT Atlantique",
      period: "2023 - Current",
      location: "Nantes, France",
      description: "Master's degree in Computer Science with specialization in cybersecurity",
      skills: ["Cybersecurity", "Software Engineering", "Networks", "Maths", "Physics"]
    },
      {
      id: 1,
      title: "Preparatory Class Student",
      company: "Lycée Déodat de Séverac",
      period: "2021 - 2023",
      location: "Toulouse, France",
      description: "Preparatory class focusing on mathematics and physics. \n PCSI-PSI*",
      skills: ["Mathematics", "Physics", "Engineering", "Computer Science"]
    },
  ];

  const itemHeight = 180;
  const containerHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 400;
  const thumbHeight = 64; // Fixed thumb height in pixels
  const trackHeight = containerHeight - thumbHeight - 4; // Available track space for thumb movement
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getThumbPositionFromIndex = (index) => {
    if (experiences.length <= 1) return 2;
    return 2 + (index / (experiences.length - 1)) * trackHeight;
  };

  const getIndexFromThumbPosition = (thumbPos) => {
    if (experiences.length <= 1) return 0;
    const normalizedPos = Math.max(0, Math.min(trackHeight, thumbPos - 2));
    return Math.round((normalizedPos / trackHeight) * (experiences.length - 1));
  };

  // Initialize to first experience
  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  // Handle wheel events for step-by-step navigation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      // Throttle wheel events to prevent too fast scrolling
      if (isScrolling) return;
      
      setIsScrolling(true);
      const delta = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(experiences.length - 1, currentIndex + delta));
      setCurrentIndex(newIndex);
      
      // Reset scrolling flag after a delay
      setTimeout(() => setIsScrolling(false), 500); // Increased from 300ms to 500ms
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent default scrolling
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // Minimum swipe distance to trigger navigation
      if (Math.abs(deltaY) < 30) return;
      
      setIsScrolling(true);
      const delta = deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(experiences.length - 1, currentIndex + delta));
      setCurrentIndex(newIndex);
      
      setTimeout(() => setIsScrolling(false), 300);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, experiences.length, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        // Throttle keyboard events to prevent too fast scrolling
        if (isScrolling) return;
        
        setIsScrolling(true);
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const newIndex = Math.max(0, Math.min(experiences.length - 1, currentIndex + delta));
        setCurrentIndex(newIndex);
        
        // Reset scrolling flag after a delay
        setTimeout(() => setIsScrolling(false), 400); // Increased from 250ms to 400ms
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, experiences.length, isScrolling]);

  const scrollToIndex = (index) => {
    const clampedIndex = Math.max(0, Math.min(experiences.length - 1, index));
    setCurrentIndex(clampedIndex);
  };

  // Simplified thumb dragging - directly control experience selection
  const handleThumbMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.clientY || e.touches?.[0]?.clientY;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e) => {
        if (!isDragging) return;
        
        // Only handle desktop vertical dragging since mobile thumb is removed
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        if (!clientY) return;
        
        const delta = clientY - startY.current;
        const thumbContainer = thumbRef.current?.parentElement;
        if (!thumbContainer) return;

        const currentThumbPos = getThumbPositionFromIndex(currentIndex);
        const newThumbPos = currentThumbPos + delta;
        const newIndex = getIndexFromThumbPosition(newThumbPos);
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          startY.current = clientY;
        }
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, currentIndex]); // Added currentIndex dependency

  // Calculate thumb position based on current index
  const thumbPosition = getThumbPositionFromIndex(currentIndex);

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 w-full h-full p-4 md:p-6 lg:p-12">
      {/* Left side - CV wheel */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl pr-0 md:pr-16">
          {/* Scroll container */}
          <div 
            ref={scrollContainerRef}
            className="h-[100vh] relative md:overflow-y-hidden"
          >
            {/* Center point reference */}
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <div className="relative w-full">
                {experiences.map((experience, index) => {
                  const distance = Math.abs(index - currentIndex);
                  const blur = distance > 0 ? `blur(${Math.min(distance * 2, 6)}px)` : 'none';
                  const opacity = distance === 0 ? 1 : Math.max(0.2, 1 - distance * 0.4);
                  const scale = distance === 0 ? 1 : Math.max(0.7, 1 - distance * 0.15);
                  
                  // Always center the selected item - others offset from it
                  const offsetFromCenter = (index - currentIndex);
                  const translateY = offsetFromCenter * 220; // Spacing between items

                  return (
                    <div
                      key={experience.id}
                      className="absolute inset-x-0 transition-all duration-700 ease-out"
                      style={{
                        filter: blur,
                        opacity: opacity,
                        transform: `scale(${scale}) translateY(${translateY}px)`,
                        height: `${itemHeight}px`,
                        top: '50%',
                        marginTop: `-${itemHeight / 2}px`,
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: distance === 0 ? 10 : Math.max(0, 10 - distance),
                        pointerEvents: 'none'
                      }}
                    >
                      <div className="pixel-border-blue bg-background p-4 md:p-6 w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-foreground truncate">{experience.title}</h3>
                            <p className="text-pblue text-sm md:text-base truncate">{experience.company}</p>
                          </div>
                          <div className="text-left md:text-right text-xs md:text-sm opacity-75 shrink-0">
                            <p className="truncate">{experience.period}</p>
                            <p className="truncate">{experience.location}</p>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-foreground opacity-90 mb-3 line-clamp-3">{experience.description}</p>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {experience.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs bg-pblue text-background px-2 py-1 truncate">
                              {skill}
                            </span>
                          ))}
                          {experience.skills.length > 3 && (
                            <span className="text-xs opacity-75 hidden md:inline">+{experience.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Custom scrollbar thumb */}
          {/* Desktop - Vertical thumb */}
          <div className="hidden md:flex absolute right-[-40px] md:right-[-50px] top-0 w-6 md:w-8 h-full flex-col justify-center">
            <div className="relative w-full h-[500px] md:h-[400px] bg-background border border-pblue ">
              {/* Scroll track */}
              <div className="absolute inset-1 bg-background"></div>
              
              {/* Experience indicators */}
              {experiences.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-1 h-1 bg-pblue opacity-50"
                  style={{
                    top: `${getThumbPositionFromIndex(index) + thumbHeight/2}px`,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
              
              {/* Scroll thumb */}
              <div
                ref={thumbRef}
                className="absolute w-4 md:w-6 h-12 md:h-16 bg-pblue cursor-move transition-transform duration-200 flex items-center justify-center"
                style={{
                  top: `${thumbPosition}px`,
                  left: '3px',
                  transform: isDragging ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseDown={handleThumbMouseDown}
                onTouchStart={handleThumbMouseDown}
              >
                <img 
                  src={`${process.env.NEXT_PUBLIC_BASE || ''}/assets/scroll_thumb.svg`} 
                  alt="Scroll thumb" 
                  className="w-3 md:w-5 h-8 md:h-12 pointer-events-none"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Current experience details */}
      <div className="flex-1 xl:max-w-md mt-6 xl:mt-0 hidden xl:block">
        <div className="border border-pblue bg-background p-4 md:p-6 h-full min-h-[350px] md:min-h-[400px] overflow-hidden">
          <div className="text-center text-background bg-pblue mb-4 text-sm md:text-base">[CURRENT SELECTION]</div>
          
          {experiences[currentIndex] && (
            <div className="flex flex-col h-[calc(100%-3rem)]">
              <div>
                <div className='flex flex-col'>
                    <RandomTextReveal 
                    className="text-2xl font-bold text-foreground truncate" 
                    text={experiences[currentIndex].title}
                    duration={1000}
                    />
                    <RandomTextReveal 
                    className="text-pblue text-lg truncate" 
                    text={experiences[currentIndex].company}
                    duration={500}
                    />
                </div>
                <div className="text-sm opacity-75 mt-2">
                  <p className="truncate">{experiences[currentIndex].period}</p>
                  <p className="truncate">{experiences[currentIndex].location}</p>
                </div>
              </div>
              
              <div className="flex-1 mt-4">
                <h4 className="text-pblue mb-2">[DESCRIPTION]</h4>
                <div className="overflow-hidden">
                  <RandomTextReveal 
                    className="text-foreground text-sm" 
                    text={experiences[currentIndex].description}
                    duration={1200}
                  />
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <h4 className="text-pblue mb-2">[SKILLS]</h4>
                <div className="flex flex-wrap gap-2">
                  {experiences[currentIndex].skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-pblue text-background px-2 py-1 truncate">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
