import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

interface VerifyOtpPageProps {
  mobileNumber: string;
  onBack: () => void;
  onChangeMobile: () => void;
  onVerifySuccess: () => void;
}

export const VerifyOtpPage: React.FC<VerifyOtpPageProps> = ({
  mobileNumber,
  onBack,
  onChangeMobile,
  onVerifySuccess,
}) => {
  // 6 digit OTP state, all initially empty
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(25);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto focus next box
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(25);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => {
        onVerifySuccess();
      }, 1200);
    }, 800);
  };

  const displayMobile = mobileNumber.trim();
  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full flex flex-col justify-between px-6 pt-5 pb-6"
      style={{ backgroundColor: '#FAF6EE' }}
    >
      {/* Top Navigation Row */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <ChevronLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>
      </View>

      {/* Main Content Body */}
      <View style={styles.mainContent}>
        {/* Title & Subtitle Block */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Verify Your Mobile Number</Text>
          <View style={styles.subtitleWrapper}>
            <Text style={styles.subtitleText}>
              We've sent a 6-digit OTP to
            </Text>
            <Text style={styles.mobileNumberText}>{displayMobile}</Text>
          </View>
        </View>

        {/* 6 Empty OTP Input Boxes */}
        <View style={styles.otpInputsRow}>
          {otp.map((digit, index) => (
            <div key={index}>
              <TextInput
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                ]}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            </div>
          ))}
        </View>

        {/* Resend & Change Number Links */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            activeOpacity={timer === 0 ? 0.7 : 1}
            onPress={handleResend}
          >
            <Text
              style={[
                styles.linkText,
                { opacity: timer === 0 ? 1 : 0.85 },
              ]}
            >
              Resend OTP in {formattedTimer}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={onChangeMobile}>
            <Text style={styles.changeMobileText}>Change Mobile Number</Text>
          </TouchableOpacity>
        </View>

        {/* Illustration Graphic Matching Screenshot */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationBgBlob}>
            <svg
              viewBox="0 0 160 140"
              className="w-40 h-36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft background shape */}
              <path
                d="M20,50 C20,20 50,10 90,15 C130,20 150,45 145,80 C140,115 110,130 65,125 C20,120 20,80 20,50 Z"
                fill="#F3EBE1"
              />
              {/* Phone outline */}
              <rect
                x="48"
                y="20"
                width="44"
                height="80"
                rx="10"
                fill="#FFFBF7"
                stroke="#581420"
                strokeWidth="2.5"
              />
              {/* Speaker / Notch */}
              <line
                x1="62"
                y1="26"
                x2="78"
                y2="26"
                stroke="#581420"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Screen phone elements */}
              <rect x="54" y="34" width="32" height="52" rx="4" fill="#EFE8DD" />

              {/* Envelope / OTP Badge floating over phone */}
              <g transform="translate(68, 54)">
                {/* Envelope box */}
                <path
                  d="M0,8 C0,3.5 3.5,0 8,0 L42,0 C46.5,0 50,3.5 50,8 L50,32 C50,36.5 46.5,40 42,40 L8,40 C3.5,40 0,36.5 0,32 Z"
                  fill="#FFFFFF"
                  stroke="#D3C9BE"
                  strokeWidth="1.5"
                />
                {/* Roof top tip */}
                <path
                  d="M0,8 L25,22 L50,8"
                  stroke="#D3C9BE"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* OTP text inside envelope */}
                <text
                  x="25"
                  y="26"
                  textAnchor="middle"
                  fill="#581420"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  OTP
                </text>
              </g>

              {/* Checkmark circular badge on right */}
              <circle cx="120" cy="75" r="13" fill="#581420" />
              <path
                d="M114,75 L118,79 L126,71"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Wi-Fi waves background */}
              <path
                d="M102,32 A18,18 0 0,1 122,52"
                stroke="#E2DDD5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M108,38 A12,12 0 0,1 120,50"
                stroke="#D8CFC5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </View>
        </View>
      </View>

      {/* Bottom Action Area */}
      <View style={styles.footerArea}>
        {verifiedSuccess ? (
          <View style={styles.successBanner}>
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <Text style={styles.successText}>Verified Successfully!</Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleVerify}
            disabled={isVerifying}
            style={styles.primaryButton}
          >
            {isVerifying ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </motion.div>
  );
};

const styles: any = StyleSheet.create({
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    gap: 16,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: '700',
    color: '#581420',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  subtitleWrapper: {
    alignItems: 'center',
    gap: 2,
  },
  subtitleText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '400',
    color: '#635B5C',
    textAlign: 'center',
  },
  mobileNumberText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '700',
    color: '#231F20',
    textAlign: 'center',
  },
  otpInputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  otpBox: {
    width: 40,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2DDD5',
    backgroundColor: '#FAF6EE',
    textAlign: 'center',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#231F20',
    outlineStyle: 'none' as any,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
  },
  otpBoxFilled: {
    borderColor: '#581420',
    backgroundColor: '#FFFFFF',
  },
  linksContainer: {
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '600',
    color: '#581420',
    textAlign: 'center',
  },
  changeMobileText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '600',
    color: '#581420',
    textAlign: 'center',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  illustrationBgBlob: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  primaryButtonText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  successBanner: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  successText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
});
