// Filename: sendOtpService.js
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';

const sendOtp = async (phone) => {
  try {
    const recaptcha = new RecaptchaVerifier(auth,'recaptcha', {});
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    console.log('OTP confirmation:', confirmation);
    return confirmation; // Return the confirmation object after successful OTP send
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Propagate error to handle in the caller component
  }
};

export default sendOtp;
