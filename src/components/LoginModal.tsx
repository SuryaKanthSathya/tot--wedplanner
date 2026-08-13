import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { motion } from 'motion/react';
import { X, Lock, Mail, ArrowRight, Heart } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor?: string;
  bgColor?: string;
  onLoginSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  primaryColor = '#5C1A24',
  bgColor = '#FFFBF7',
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!email || !password) return;
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleClose = () => {
    const wasSuccess = isSuccess;
    setIsSuccess(false);
    setEmail('');
    setPassword('');
    onClose();
    if (wasSuccess && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative border border-white/20 p-6"
          style={{ backgroundColor: bgColor }}
        >
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
            <X className="w-4 h-4 text-stone-600" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Heart className="w-6 h-6" style={{ color: primaryColor }} />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Access your Tale of Two wedding portal</Text>
          </View>

          {isSuccess ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                ✓ Successfully logged in! Redirecting to client portal...
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={[styles.submitBtn, { backgroundColor: primaryColor }]}
              >
                <Text style={styles.submitBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="couple@taleoftwo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Passcode</Text>
                <View style={styles.inputWrapper}>
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoggingIn}
                style={[styles.submitBtn, { backgroundColor: primaryColor }]}
              >
                <Text style={styles.submitBtnText}>
                  {isLoggingIn ? 'Verifying...' : 'Sign In'}
                </Text>
                <ArrowRight className="w-3.5 h-3.5 text-white ml-2" />
              </TouchableOpacity>
            </View>
          )}
        </motion.div>
      </View>
    </Modal>
  );
};

const styles: any = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  } as any,
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: 'rgba(231, 229, 228, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(231, 229, 228, 0.8)',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1917',
  },
  subtitle: {
    fontSize: 12,
    color: '#78716c',
    marginTop: 2,
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#78716c',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 12,
    paddingVertical: 10,
    paddingLeft: 36,
    paddingRight: 12,
    fontSize: 12,
    color: '#1c1917',
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  successBox: {
    alignItems: 'center',
    gap: 12,
  },
  successText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    textAlign: 'center',
  },
});
