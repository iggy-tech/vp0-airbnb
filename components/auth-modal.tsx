import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './text';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthSuccess?: (user?: any) => void;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
];

export default function AuthModal({ visible, onClose, onAuthSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'login' | 'phone-verification' | 'country-select'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use Expo's Google auth provider with custom redirect
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: 'com.googleusercontent.apps.1098511002266-260os3vvurusndv8limak4u3hf2s1j7h://',
  });

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google auth successful:', authentication);
      
      if (authentication?.idToken) {
        handleSupabaseAuth(authentication.idToken);
      } else {
        Alert.alert('Error', 'No ID token received from Google');
      }
    } else if (response?.type === 'error') {
      console.error('Google auth error:', response.error);
      Alert.alert('Sign-In Error', response.error?.message || 'Authentication failed');
    }
  }, [response]);

  const handleSupabaseAuth = async (idToken: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Supabase Auth Error:', error);
        Alert.alert('Authentication Error', error.message);
        return;
      }

      // Success!
      console.log('User authenticated:', data.user);
      Alert.alert('Success!', 'You have been signed in successfully');
      onAuthSuccess?.(data.user);
      onClose();
    } catch (error: any) {
      console.error('Authentication Error:', error);
      Alert.alert('Authentication Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Google Sign-In handler (stays in app!)
  const handleGoogleSignIn = () => {
    console.log('Starting Google Sign-In...');
    promptAsync();
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleContinue = () => {
    if (step === 'login') {
      setStep('phone-verification');
    } else {
      // Complete auth flow
      onAuthSuccess?.();
      onClose();
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const renderCountryPicker = () => (
    <Modal
      visible={showCountryPicker}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Country/Region</Text>
            <Pressable onPress={() => setShowCountryPicker(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </Pressable>
          </View>

          <ScrollView style={styles.countryList}>
            {countries.map((country, index) => (
              <Pressable 
                key={index}
                style={styles.countryItem}
                onPress={() => handleCountrySelect(country)}
              >
                <Text style={styles.countryItemText}>
                  {country.name} ({country.code})
                </Text>
                <View style={[
                  styles.radioButton,
                  selectedCountry.code === country.code && styles.radioButtonSelected
                ]}>
                  {selectedCountry.code === country.code && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderLoginStep = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Log in or sign up</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </Pressable>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country/Region</Text>
          <Pressable 
            style={styles.countrySelector}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.countryText}>
              {selectedCountry.name} ({selectedCountry.code})
            </Text>
            <Ionicons name="chevron-down" size={20} color="#717171" />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="(xxx) xxx-xxxx"
            placeholderTextColor="#717171"
            keyboardType="phone-pad"
            onFocus={() => setIsPhoneFocused(true)}
            onBlur={() => setIsPhoneFocused(false)}
            maxLength={14}
          />
        </View>
        
        <Text style={styles.disclaimer}>
          We&apos;ll call or text to confirm your number. Standard message and data rates apply.
        </Text>
      </View>

      <View style={styles.buttonSection}>
        <Pressable 
          style={[
            styles.continueButton, 
            phoneNumber ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!phoneNumber}
        >
          <Text style={[
            styles.continueButtonText,
            phoneNumber ? styles.continueButtonTextActive : styles.continueButtonTextInactive
          ]}>
            Continue
          </Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <Pressable style={styles.socialButton}>
            <View style={styles.socialButtonContent}>
              <Ionicons name="mail-outline" size={20} color="#000" style={styles.socialButtonIcon} />
              <Text style={styles.socialButtonText}>Continue with email</Text>
            </View>
          </Pressable>

          <Pressable style={styles.socialButton}>
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-apple" size={20} color="#000" style={styles.socialButtonIcon} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </View>
          </Pressable>

          <Pressable 
            style={[styles.socialButton, isLoading && styles.socialButtonLoading]}
            onPress={handleGoogleSignIn}
            disabled={isLoading || !request}
          >
            <View style={styles.socialButtonContent}>
              <Image 
                source={require('../assets/google-icon.png')} 
                style={styles.googleLogo}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </Text>
            </View>
          </Pressable>

          <Pressable style={styles.socialButton}>
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.socialButtonIcon} />
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const handleBackToLogin = () => {
    setStep('login');
    setVerificationCode('');
  };

  const renderPhoneVerificationStep = () => (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Pressable onPress={handleBackToLogin} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.modalTitle}>Confirm your number</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </Pressable>
      </View>

      <View style={styles.verificationSection}>
        <Text style={styles.verificationText}>
          Enter the code we sent over SMS to {selectedCountry.code} {phoneNumber}:
        </Text>

        <View style={styles.codeInputContainer}>
          <TextInput
            style={styles.codeInput}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="– – – – – –"
            placeholderTextColor="#B0B0B0"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus={true}
          />
        </View>

        <Pressable style={styles.linkButton}>
          <Text style={styles.resendText}>
            Didn&apos;t get an SMS? <Text style={styles.resendLink}>Send again</Text>
          </Text>
        </Pressable>

        <Pressable style={styles.linkButton}>
          <Text style={styles.moreOptionsText}>More options</Text>
        </Pressable>
      </View>

      <View style={styles.bottomSection}>
        <Pressable 
          style={[
            styles.continueButton,
            verificationCode.length === 6 ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={verificationCode.length !== 6}
        >
          <Text style={[
            styles.continueButtonText,
            verificationCode.length === 6 ? styles.continueButtonTextActive : styles.continueButtonTextInactive
          ]}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const getCurrentStep = () => {
    if (showCountryPicker) return renderCountryPicker();
    if (step === 'login') return renderLoginStep();
    return renderPhoneVerificationStep();
  };

  return (
    <Modal
      visible={visible || showCountryPicker}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        {getCurrentStep()}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  inputSection: {
    paddingTop: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#717171',
    marginBottom: 8,
    fontWeight: '600',
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  countryText: {
    fontSize: 16,
    color: '#222222',
  },
  phoneInput: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#222222',
    fontFamily:'figtree'
  },
  disclaimer: {
    fontSize: 12,
    color: '#717171',
    lineHeight: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  buttonSection: {
    flex: 1,
    paddingTop: 8,
    justifyContent: 'flex-start',
  },
  continueButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonActive: {
    backgroundColor: '#FF385C',
  },
  continueButtonInactive: {
    backgroundColor: '#DDDDDD',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextActive: {
    color: '#fff',
  },
  continueButtonTextInactive: {
    color: '#ABABAB',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#717171',
    fontSize: 12,
  },
  socialButtons: {
    gap: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  socialButtonLoading: {
    opacity: 0.6,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  socialButtonIcon: {
    position: 'absolute',
    left: 0,
  },
  googleLogo: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 0,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    textAlign: 'center',
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countryItemText: {
    fontSize: 16,
    color: '#222222',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#000',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  verificationSection: {
    paddingTop: 32,
    flex: 1,
  },
  verificationText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 32,
    color: '#222222',
  },
  codeInputContainer: {
    marginBottom: 32,
  },
  codeInput: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#222222',
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    backgroundColor: '#fff',
    color: '#222222',
  },
  linkButton: {
    marginBottom: 16,
  },
  resendText: {
    fontSize: 16,
    color: '#222222',
  },
  resendLink: {
    textDecorationLine: 'underline',
    color: '#222222',
  },
  moreOptionsText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#222222',
  },
  bottomSection: {
    paddingBottom: 40,
  },
});