
import React, { useState, useEffect } from 'react';
import { Sparkles, Flower, Send } from 'lucide-react';

const YogaHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed header that appears when scrolling */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-yogaTeal-light to-yogaSage-light backdrop-blur-md shadow-sm transition-all duration-300 ${scrolled ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Omspiration
            </h1>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <h2 className="text-lg font-medium text-primary/80 text-center">
            Your Yoga Sequence Builder, Made with Love by MmunAI
          </h2>
        </div>
      </header>
      
      {/* Original header with full content */}
      <header className={`w-full py-10 mb-8 animate-slide-up mt-${scrolled ? '24' : '0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            {/* Title with sparkle icons */}
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
                Omspiration
              </h1>
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-medium text-primary/80">
              Your Yoga Sequence Builder, Made with Love by MmunAI
            </h2>
            
            {/* Decorative element */}
            <div className="flex justify-center">
              <div className="w-24 h-1.5 bg-gradient-to-r from-yogaTeal to-secondary rounded-full"></div>
            </div>
            
            {/* Main description with emoji */}
            <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground">
              <p className="text-xl font-medium">
                Build your first yoga class with clarity and confidence.
              </p>
              
              <p className="flex items-center justify-center gap-2 text-lg">
                <Flower className="h-6 w-6 text-secondary" /> 
                Drag & drop poses, choose your theme, and generate a full PDF teaching guide—step-by-step cues included.
              </p>
            </div>
            
            {/* Features list */}
            <div className="flex flex-col md:flex-row justify-center gap-6 text-base font-medium text-primary/80 mt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                <span>Designed for new teachers, just like you.</span>
              </div>
              <div className="flex items-center gap-2">
                <Flower className="h-5 w-5 text-secondary" />
                <span>Organize by section.</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-secondary" />
                <span>Mark your peak pose with one click.</span>
              </div>
            </div>
            
            {/* Browse message */}
            <div className="mt-8 pt-5 border-t border-primary/10 text-primary/70 font-medium">
              <p className="flex items-center justify-center gap-2 text-lg">
                🧭 Browse Poses & Start Building
              </p>
              <p className="text-base mt-2 text-muted-foreground">
                Explore the asana gallery below to begin your sequence.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default YogaHeader;
