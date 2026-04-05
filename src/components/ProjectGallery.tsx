import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-espresso/5 group-hover:bg-transparent transition-all duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={prevImage}
            className="w-12 h-12 bg-cream/90 backdrop-blur-sm flex items-center justify-center text-espresso hover:bg-gold hover:text-cream transition-all rounded-full shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextImage}
            className="w-12 h-12 bg-cream/90 backdrop-blur-sm flex items-center justify-center text-espresso hover:bg-gold hover:text-cream transition-all rounded-full shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <button 
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-6 right-6 px-6 py-3 bg-cream/90 backdrop-blur-sm flex items-center gap-2 text-espresso hover:bg-gold hover:text-cream transition-all rounded-full shadow-lg opacity-0 group-hover:opacity-100 font-bold text-[10px] uppercase tracking-widest"
        >
          <Maximize2 size={14} /> View Gallery
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-espresso/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-widest font-bold">
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
              className={cn(
                "aspect-square overflow-hidden bg-linen border-2 transition-all duration-500 relative group",
                currentIndex === i ? "border-gold" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${i + 1}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-espresso flex items-center justify-center p-6 md:p-12"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
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
                  className="p-4 text-cream/40 hover:text-cream transition-colors"
                >
                  <ChevronLeft size={48} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  onClick={nextImage}
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
