import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, User, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface CreateAccountPageProps {
  onBack: () => void;
  onSuccessSubmit: (data: { name: string; mobile: string; email: string }) => void;
}

export const CreateAccountPage: React.FC<CreateAccountPageProps> = ({
  onBack,
  onSuccessSubmit,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showOtpSent, setShowOtpSent] = useState<boolean>(false);

  const handleSubmit = () => {
    onSuccessSubmit({
      name: fullName,
      mobile: mobileNumber,
      email: email,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full flex flex-col justify-between px-6 pt-5 pb-6"
      style={{ backgroundColor: '#FAF6EE' }}
    >
      {/* Top Header Row with Back Button */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <ChevronLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Title Block */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Create Your Account</Text>
          <Text style={styles.subtitleText}>
            Let's start planning your{'\n'}perfect wedding
          </Text>
        </View>

        {/* Input Fields Stack (3 Fields - City & Wedding Date removed) */}
        <View style={styles.formFieldsStack}>
          {/* Field 1: Full Name */}
          <View style={styles.inputCard}>
            <View style={styles.iconContainer}>
              <User className="w-4 h-4 text-stone-500" />
            </View>
            <View style={styles.inputRightCol}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor="#A39B9C"
              />
            </View>
          </View>

          {/* Field 2: Mobile Number */}
          <View style={styles.inputCard}>
            <View style={styles.iconContainer}>
              <Phone className="w-4 h-4 text-stone-500" />
            </View>
            <View style={styles.inputRightCol}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="+91 00000 00000"
                keyboardType="phone-pad"
                placeholderTextColor="#A39B9C"
              />
            </View>
          </View>

          {/* Field 3: Email (Optional) */}
          <View style={styles.inputCard}>
            <View style={styles.iconContainer}>
              <Mail className="w-4 h-4 text-stone-500" />
            </View>
            <View style={styles.inputRightCol}>
              <Text style={styles.inputLabel}>Email (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A39B9C"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Footer Area with Primary Button & Verification Note */}
      <View style={styles.footerArea}>
        <AnimatePresence mode="wait">
          {showOtpSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-[85%] max-w-[360px] bg-[#581420]/10 border border-[#581420]/30 rounded-2xl p-3 flex flex-row items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#581420]" />
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#581420' }}>
                OTP sent to {mobileNumber}!
              </Text>
            </motion.div>
          ) : (
            <View style={{ width: '100%', gap: 14 }}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={styles.primaryButton}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Continue with Mobile Number
                  </Text>
                )}
              </TouchableOpacity>

              <Text style={styles.footerNoteText}>
                We will send you an OTP to verify{'\n'}your mobile number.
              </Text>
            </View>
          )}
        </AnimatePresence>
      </View>
    </motion.div>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 20,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 28,
    fontWeight: '700',
    color: '#581420',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '400',
    color: '#524C4D',
    textAlign: 'center',
    lineHeight: 18,
  },
  formFieldsStack: {
    width: '85%',
    maxWidth: 360,
    alignSelf: 'center',
    gap: 12,
    marginTop: 4,
  },
  inputCard: {
    width: '100%',
    backgroundColor: '#FAF6EE',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRightCol: {
    flex: 1,
    gap: 2,
  },
  inputLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    fontWeight: '500',
    color: '#8C8283',
  },
  textInput: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '600',
    color: '#231F20',
    padding: 0,
    margin: 0,
    outlineStyle: 'none' as any,
  },
  footerArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
  },
  primaryButton: {
    width: '85%',
    maxWidth: 360,
    alignSelf: 'center',
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
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  footerNoteText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '400',
    color: '#635B5C',
    textAlign: 'center',
    lineHeight: 16,
  },
});
