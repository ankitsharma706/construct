import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import OptimizedImage from './OptimizedImage';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isFullscreen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : openButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isFullscreen]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-8">
      {/* Main Featured Image */}
      <div className="relative aspect-[21/9] overflow-hidden bg-linen group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={images[currentIndex]}
              alt={`${title} - image ${currentIndex + 1} of ${images.length}`}
              priority={currentIndex === 0}
              aspectRatio="21/9"
              className="w-full h-full"
              imageClassName="grayscale group-hover:grayscale-0 transition-transform duration-1000"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-all duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-500">
          <button 
            onClick={prevImage}
            aria-label="Show previous project image"
            className="w-12 h-12 bg-cream/90 backdrop-blur-sm flex items-center justify-center text-espresso hover:bg-gold hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-all rounded-full shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage}
            aria-label="Show next project image"
            className="w-12 h-12 bg-cream/90 backdrop-blur-sm flex items-center justify-center text-espresso hover:bg-gold hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-all rounded-full shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <button
          ref={openButtonRef}
          onClick={() => setIsFullscreen(true)}
          aria-label={`Open ${title} gallery in fullscreen`}
          className="absolute bottom-6 right-6 px-6 py-3 bg-cream/90 backdrop-blur-sm flex items-center gap-2 text-espresso hover:bg-gold hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-all rounded-full shadow-lg opacity-0 group-hover:opacity-100 focus-visible:opacity-100 font-bold text-[10px] uppercase tracking-widest"
        >
          <Maximize2 size={14} /> View Gallery
        </button>

        {/* Counter */}
        <div aria-live="polite" aria-atomic="true" className="absolute bottom-6 left-6 px-4 py-2 bg-espresso/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-widest font-bold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso/40">Project Gallery</h4>
          <div className="text-[10px] text-gold font-bold uppercase tracking-widest">{images.length} Images</div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-pressed={currentIndex === i}
              className={cn(
                "aspect-square overflow-hidden bg-linen border-2 transition-all duration-500 relative group",
                currentIndex === i ? "border-gold" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <OptimizedImage
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                aspectRatio="1/1"
                className="w-full h-full"
                imageClassName="grayscale group-hover:grayscale-0 transition-transform duration-500"
              />
              {currentIndex === i && (
                <div className="absolute inset-0 bg-gold/10" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} project gallery`}
            className="fixed inset-0 z-[100] bg-espresso flex items-center justify-center p-6 md:p-12"
          >
            <button 
              ref={closeButtonRef}
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen gallery"
              className="absolute top-8 right-8 text-cream/60 hover:text-cream transition-colors z-[110]"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <button 
                  onClick={prevImage}
                  aria-label="Show previous project image"
                  className="p-4 text-cream/40 hover:text-cream transition-colors"
                >
                  <ChevronLeft size={48} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  onClick={nextImage}
                  aria-label="Show next project image"
                  className="p-4 text-cream/40 hover:text-cream transition-colors"
                >
                  <ChevronRight size={48} />
                </button>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 py-8 text-cream/60 text-sm font-serif italic">
                {title} — Image {currentIndex + 1} of {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
