'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import RetroLoading from '@/components/loading/retroLoading';

// Global variable to track if loading has been shown in this session
// This persists across page navigation but resets on page refresh
if (typeof window !== 'undefined') {
  window.__loadingShown = window.__loadingShown || false;
}

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [fontLoaded, setFontLoaded] = useState(false);
  const pathname = usePathname();

  // Check if custom font is loaded
  useEffect(() => {
    const checkFontLoading = async () => {
      if (typeof window !== 'undefined' && 'fonts' in document) {
        try {
          // Wait for the custom font to load
          await document.fonts.load('1em Unifont');
          await document.fonts.ready;
          setFontLoaded(true);
        } catch (error) {
          // Fallback: assume font is loaded after a timeout
          setTimeout(() => setFontLoaded(true), 2000);
        }
      } else {
        // Fallback for browsers without font loading API
        setTimeout(() => setFontLoaded(true), 2000);
      }
    };

    checkFontLoading();
  }, []);

  useEffect(() => {
    // Only set up loading behavior after font is loaded
    if (!fontLoaded) return;

    // Only show loading screen on home page
    if (pathname !== '/') {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Check if we've already shown loading in this browser session
    if (typeof window !== 'undefined' && window.__loadingShown) {
      // Skip loading for page navigation after initial load
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Show loading for initial load or refresh
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // Show faster loading for subsequent visits (4x speed)
      setSpeedMultiplier(4);
    } else {
      // Show normal speed loading for first visit
      setSpeedMultiplier(1);
      sessionStorage.setItem('hasVisited', 'true');
    }
    
    // Mark that we've shown loading in this session
    if (typeof window !== 'undefined') {
      window.__loadingShown = true;
    }
  }, [fontLoaded, pathname]);

  const handleLoadingComplete = () => {
    // This will only be called after the full animation sequence completes
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <>
      {/* Show background screen until font loads */}
      {!fontLoaded && (
        <div className="fixed tv-grain inset-0 bg-background z-50" />
      )}
      
      {/* Show loading screen after font loads */}
      {fontLoaded && isLoading && (
        <RetroLoading onComplete={handleLoadingComplete} speedMultiplier={speedMultiplier} />
      )}
      
      {/* Main content */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}
