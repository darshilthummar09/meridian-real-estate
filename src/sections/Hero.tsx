import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { CONSTRUCTION_STAGES } from '../data/constructionStages';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Preload stage images as instant fallback and background poster
  useEffect(() => {
    CONSTRUCTION_STAGES.forEach((stage) => {
      const img = new Image();
      img.src = stage.photorealisticImage;
    });
  }, []);

  // Map progress (0.0 to 1.0) to corresponding construction stage index (0 to 6)
  const getStageFromProgress = useCallback((progress: number) => {
    if (progress < 0.14) return 0; // 01 Virgin Land
    if (progress < 0.28) return 1; // 02 Deep Bedrock
    if (progress < 0.44) return 2; // 03 Rising Concrete
    if (progress < 0.60) return 3; // 04 Architectural Envelope
    if (progress < 0.76) return 4; // 05 Artisanal Timber
    if (progress < 0.90) return 5; // 06 The Heated Pool
    return 6;                      // 07 Sanctuary of Living Art
  }, []);

  // Update visual frame strictly based on scroll position
  const handleScroll = useCallback(() => {
    if (!trackRef.current || isAutoPlaying) return;

    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const scrollableDistance = track.offsetHeight - window.innerHeight;

    if (scrollableDistance <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

    setScrollProgress(progress);
    const stageIdx = getStageFromProgress(progress);
    setActiveStageIndex(stageIdx);

    if (videoRef.current && videoRef.current.duration) {
      const targetTime = progress * videoRef.current.duration;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.04) {
        videoRef.current.currentTime = targetTime;
      }
      setCurrentTime(targetTime);
    } else {
      setCurrentTime(progress * 8.0);
    }
  }, [getStageFromProgress, isAutoPlaying]);

  // Sync scroll listener with requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setIsVideoLoaded(true);
      handleScroll();
    }
  };

  // Auto-play mode implementation: plays the video and synchronizes page scroll
  useEffect(() => {
    if (!isAutoPlaying || !trackRef.current) return;

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    const interval = setInterval(() => {
      if (!videoRef.current || !trackRef.current) return;
      const duration = videoRef.current.duration || 8;
      const current = videoRef.current.currentTime;
      const progress = Math.min(current / duration, 1);

      setScrollProgress(progress);
      setCurrentTime(current);
      setActiveStageIndex(getStageFromProgress(progress));

      // Synchronize window scroll position with playback
      const track = trackRef.current;
      const trackTop = track.offsetTop;
      const scrollableDistance = track.offsetHeight - window.innerHeight;
      const targetScrollY = trackTop + progress * scrollableDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'auto',
      });

      if (progress >= 0.999) {
        setIsAutoPlaying(false);
        if (videoRef.current) videoRef.current.pause();
      }
    }, 35);

    return () => {
      clearInterval(interval);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isAutoPlaying, getStageFromProgress]);

  // Toggle Auto-Play vs Scroll Scrubbing
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (videoRef.current) videoRef.current.pause();
    } else {
      if (scrollProgress >= 0.98) {
        handleResetToStart();
      }
      setIsAutoPlaying(true);
      if (videoRef.current) videoRef.current.play().catch(() => {});
    }
  };

  // Jump to specific milestone stage by scrolling to its proportional position
  const scrollToMilestone = (stageIndex: number) => {
    if (!trackRef.current) return;
    setIsAutoPlaying(false);
    if (videoRef.current) videoRef.current.pause();

    const milestoneProportions = [0.03, 0.20, 0.36, 0.52, 0.68, 0.83, 0.98];
    const targetPercent = milestoneProportions[stageIndex] ?? 0;

    const track = trackRef.current;
    const trackTop = track.offsetTop;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    const targetScrollY = trackTop + targetPercent * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Smooth scroll down to Philosophy section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('philosophy');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rewind to 00:00
  const handleResetToStart = () => {
    if (!trackRef.current) return;
    setIsAutoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    window.scrollTo({
      top: trackRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const currentStage = CONSTRUCTION_STAGES[activeStageIndex] || CONSTRUCTION_STAGES[0];
  const percentDisplay = Math.round(scrollProgress * 100);

  return (
    <section
      id="hero-genesis-track"
      ref={trackRef}
      className="relative w-full h-[500vh] bg-[#0C0C0B] text-[#F3F0EA]"
    >
      {/* Sticky Inner Viewport: Pinned full-screen container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end pb-4 sm:pb-6 select-none">
        
        {/* Full-Bleed Video Background with Layered Image Fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0C0C0B]">
          {/* Active Photorealistic Stage Image Fallback & Poster */}
          {CONSTRUCTION_STAGES.map((stage, idx) => {
            const isVisible = activeStageIndex === idx;
            return (
              <div
                key={stage.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={stage.photorealisticImage}
                  alt={stage.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            );
          })}

          {/* Master Video Timelapse Element (Synced with Scroll Scrubbing & Auto Play) */}
          <video
            ref={videoRef}
            src="/videos/construction-timelapse.mp4"
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 z-20 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Subtle Contrast Vignette */}
          <div className="absolute inset-0 z-25 bg-gradient-to-t from-[#0C0C0B]/90 via-transparent to-[#0C0C0B]/30 pointer-events-none" />
        </div>

        {/* Bottom Floating Milestone Scrubber & Timeline Bar */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-[#0C0C0B]/85 backdrop-blur-md border border-[#262624] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-2.5">
            
            {/* Header: Status Line, Controls & Prompt */}
            <div className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleResetToStart}
                  className="p-1.5 bg-[#171716] border border-[#262624] text-[#9B978F] hover:text-[#F3F0EA] hover:border-[#C5A059] transition-colors cursor-pointer"
                  title="Rewind to Site Demarcation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Auto Play Toggle */}
                <button
                  onClick={toggleAutoPlay}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    isAutoPlaying
                      ? 'bg-[#C5A059] text-[#0C0C0B] border-[#C5A059] shadow-md font-bold'
                      : 'bg-[#171716] text-[#F3F0EA] border-[#262624] hover:border-[#C5A059]'
                  }`}
                  title={isAutoPlaying ? 'Switch to Scroll Scrubbing' : 'Auto Play Timelapse'}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                      <span>Auto Play</span>
                    </>
                  )}
                </button>

                {/* Live Phase Name */}
                <span className="text-[#C5A059] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider hidden sm:inline">
                  Step {currentStage.stepNumber} · {currentStage.phase}
                </span>
              </div>

              {/* Right Side: Progress Meter / Next Section CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-[10px] sm:text-[11px] font-mono text-[#F3F0EA] flex items-center gap-1">
                  <span className="text-[#C5A059] font-bold">{percentDisplay}%</span>
                  <span className="text-[#444]">/</span>
                  <span className="text-[#9B978F]">{currentTime.toFixed(1)}s</span>
                </div>

                {scrollProgress >= 0.96 ? (
                  <button
                    onClick={scrollToNextSection}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C5A059] text-[#0C0C0B] text-[10px] font-mono font-bold uppercase tracking-wider animate-bounce cursor-pointer shadow-lg"
                  >
                    <span>Enter Residence</span>
                    <ArrowDown className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={scrollToNextSection}
                    className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#9B978F] hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    <span>Manifesto</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Continuous Progress Bar */}
            <div className="relative w-full h-1 bg-[#262624] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C5A059] via-[#E5C394] to-[#C5A059] transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* 7 Milestone Step Buttons Matching Stage Sequences */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-0.5">
              {CONSTRUCTION_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                const isPast = activeStageIndex > idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => scrollToMilestone(idx)}
                    className={`p-1.5 sm:p-2 text-left border transition-all cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#F3F0EA] shadow-md'
                        : isPast
                        ? 'bg-[#181716] border-[#262624] text-[#EDE8DF] hover:border-[#C5A059]'
                        : 'bg-[#10100F] border-[#262624] text-[#777] hover:border-[#555]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono font-bold ${
                          isActive ? 'text-[#C5A059]' : isPast ? 'text-[#EDE8DF]' : 'text-[#777]'
                        }`}
                      >
                        {stage.stepNumber}
                      </span>
                      {isPast && <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />}
                    </div>

                    <div className="font-serif-luxury text-[10px] sm:text-[11px] font-medium mt-0.5 truncate hidden sm:block">
                      {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Technical Specifications Modal */}
      <AnimatePresence>
        {isDossierOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsDossierOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#181716] border border-[#262624] p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-[#F3F0EA] space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#262624] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest font-semibold">
                    Technical Specifications · Step {currentStage.stepNumber}
                  </span>
                  <h2 className="font-serif-luxury text-3xl text-[#F3F0EA] mt-1">
                    {currentStage.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="px-3 py-1.5 border border-[#262624] text-xs font-sans uppercase hover:border-[#C5A059] cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-sm text-[#D4CEC4] leading-relaxed">
                <p>{currentStage.description}</p>
                <div className="p-3 bg-[#C5A059]/10 border-l-2 border-[#C5A059] text-xs text-[#EDE8DF]">
                  <strong className="text-[#C5A059]">Architectural Rationale: </strong>
                  {currentStage.architecturalNote}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentStage.stats.map((st, i) => (
                  <div key={i} className="p-3 bg-[#0C0C0B] border border-[#262624]">
                    <div className="text-[10px] font-sans uppercase text-[#888]">{st.label}</div>
                    <div className="text-sm font-mono text-[#F3F0EA] font-semibold mt-0.5">{st.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="px-6 py-2.5 bg-[#C5A059] text-[#0C0C0B] text-xs font-sans uppercase tracking-widest font-semibold cursor-pointer hover:bg-[#D4AF37]"
                >
                  Return to Genesis Viewer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
