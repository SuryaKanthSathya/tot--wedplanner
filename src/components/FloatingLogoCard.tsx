import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { motion } from 'motion/react';

interface FloatingLogoCardProps {
  primaryColor?: string;
  tagline?: string;
  brandName?: string;
}

export const FloatingLogoCard: React.FC<FloatingLogoCardProps> = ({
  primaryColor = '#5B1B29',
  tagline = 'Your Dream, Our Passion',
  brandName = 'Tale of Two',
}) => {
  return (
    <View style={styles.container}>
      {/* Floating White Rounded Square Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] bg-[#FAF6EE]/90 backdrop-blur-md rounded-2xl border border-white/90 flex items-center justify-center p-2.5 mb-2 relative"
        style={{
          boxShadow: '0 10px 28px -6px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Heart + Couple Line Art Logo SVG matching reference image */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-[#5B1B29]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Heart Shape */}
          <path
            d="M50,88 C18,68 6,48 6,30 C6,16 18,6 32,6 C41,6 46,10 50,16 C54,10 59,6 68,6 C82,6 94,16 94,30 C94,48 82,68 50,88 Z"
            style={{ stroke: primaryColor }}
          />
          {/* Couple Figures embracing inside heart */}
          {/* Bride head */}
          <circle cx="42" cy="35" r="5" style={{ stroke: primaryColor }} />
          {/* Groom head */}
          <circle cx="58" cy="33" r="5.5" style={{ stroke: primaryColor }} />
          {/* Groom turban contour */}
          <path d="M53,28 C58,23 64,27 64,32" style={{ stroke: primaryColor }} />
          {/* Embracing arms / shoulders forming inner heart lines */}
          <path d="M24,52 Q38,38 48,46 Q58,38 74,52" style={{ stroke: primaryColor }} />
          <path d="M34,62 Q50,78 66,62" style={{ stroke: primaryColor }} />
        </svg>
      </motion.div>

      {/* Brand Name Title */}
      <motion.div
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Text style={[styles.brandTitle, { color: primaryColor }]}>
          {brandName}
        </Text>
      </motion.div>

      {/* Subtitle Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Text style={[styles.tagline, { color: primaryColor }]}>
          {tagline}
        </Text>
      </motion.div>
    </View>
  );
};

const styles: any = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 27,
    fontWeight: '700',
    letterSpacing: -0.1,
    textAlign: 'center',
    marginBottom: 1,
    textShadow: '0px 1px 3px rgba(255, 255, 255, 0.9)',
  } as any,
  tagline: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
    opacity: 0.95,
  },
});



