import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, FileText } from 'lucide-react';

interface LuxuryToastProps {
  message: string | null;
}

export const LuxuryToast: React.FC<LuxuryToastProps> = ({ message }) => {
  if (!message) return null;

  const isQuoteReady =
    message.toLowerCase().includes('received') ||
    message.toLowerCase().includes('view quote') ||
    message.toLowerCase().includes('ready') ||
    message.toLowerCase().includes('confirmed');

  const isSent =
    message.toLowerCase().includes('sent') ||
    message.toLowerCase().includes('reviewing') ||
    message.toLowerCase().includes('requested');

  const title = isQuoteReady
    ? 'Vendor Quotation Received'
    : isSent
    ? 'Quote Request Sent'
    : 'Notification';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 350 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto"
      >
        <div className="flex items-center gap-3.5 bg-[#2A2425] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#E8DEC2]/30 backdrop-blur-md max-w-[92vw] sm:max-w-md w-max">
          {/* Icon Circle */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isQuoteReady
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                : 'bg-[#581420]/90 border border-[#C28E38]/50 text-[#C28E38]'
            }`}
          >
            {isQuoteReady ? (
              <FileText className="w-4 h-4" />
            ) : isSent ? (
              <Clock className="w-4 h-4 text-[#C28E38]" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#C28E38]" />
            )}
          </div>

          {/* Structured Text Content */}
          <div className="flex flex-col min-w-0 pr-1">
            <span className="text-[13px] font-bold text-stone-100 tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
              {title}
            </span>
            <span className="text-[11.5px] text-stone-300 font-normal leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
              {message}
            </span>
          </div>

          {/* Pulse indicator on ready */}
          {isQuoteReady && (
            <div className="flex items-center justify-center pl-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
