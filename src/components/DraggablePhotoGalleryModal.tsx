import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';

interface DraggablePhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  initialIndex?: number;
  title?: string;
  category?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.94,
  }),
};

export const DraggablePhotoGalleryModal: React.FC<DraggablePhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  title = 'Wedding Gallery',
  category = 'Photography',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  // Sync initial index whenever opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, photos.length - 1)));
    }
  }, [isOpen, initialIndex, photos.length]);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return photos.length - 1;
        if (next >= photos.length) return 0;
        return next;
      });
    },
    [photos.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      else if (e.key === 'ArrowLeft') paginate(-1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, paginate, onClose]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex flex-col justify-between select-none overflow-hidden"
        onClick={onClose}
      >
        {/* TOP HEADER BAR */}
        <div
          className="w-full max-w-6xl mx-auto px-4 py-3 flex items-center justify-between z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              <ImageIcon className="w-5 h-5 text-[#F5DEB3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white text-base sm:text-lg font-bold font-serif tracking-wide">{title}</h3>
                <span className="bg-[#581420] text-[#FDE68A] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md border border-[#FDE68A]/30 uppercase">
                  {category}
                </span>
              </div>
              <p className="text-stone-400 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E5A93C]" /> {photos.length} High-Resolution Photographs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Counter Pill */}
            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-semibold tracking-wider">
              <span className="text-[#FDE68A] font-bold">{currentIndex + 1}</span> / {photos.length}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white flex items-center justify-center border border-white/20"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN VIEWPORT WITH DRAGGABLE PHOTO & CHEVRONS */}
        <div
          className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center px-4 sm:px-12 py-2 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Draggable Main Image Container */}
          <div className="relative w-full h-full max-h-[62vh] sm:max-h-[68vh] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 350, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -60 || velocity.x < -300) {
                    paginate(1);
                  } else if (swipe > 60 || velocity.x > 300) {
                    paginate(-1);
                  }
                }}
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <img
                  src={currentPhoto}
                  alt={`${title} - Photo ${currentIndex + 1}`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/images/exact_wedding_couple_1786457746200.jpg';
                  }}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl pointer-events-none border border-white/10"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Drag Hint Pill */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-stone-300 border border-white/15 flex items-center gap-1.5 shadow-lg">
              <span className="animate-pulse">↔</span> Drag or swipe photo to navigate
            </span>
          </div>
        </div>

        {/* BOTTOM THUMBNAIL STRIP */}
        <div
          className="w-full max-w-5xl mx-auto px-4 py-3 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent justify-start sm:justify-center">
            {photos.map((photo, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-200 ${
                    isCurrent
                      ? 'ring-2 ring-[#FDE68A] scale-105 opacity-100 shadow-lg'
                      : 'opacity-50 hover:opacity-85 scale-95'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/images/exact_wedding_couple_1786457746200.jpg';
                    }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 border-2 border-[#FDE68A] rounded-xl pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
