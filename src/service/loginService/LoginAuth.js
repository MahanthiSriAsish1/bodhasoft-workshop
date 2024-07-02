import { RecaptchaVerifier } from "firebase/auth";
import {auth} from "../../config/FirebaseConfig"


window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  

// export const handleSendOtp = async (phone, setVerificationId, setIsOtpSent) => {
//   const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//   try {
//     const confirmationResult = await auth.signInWithPhoneNumber(phone, recaptchaVerifier);
//     setVerificationId(confirmationResult.verificationId);
//     setIsOtpSent(true);
//   } catch (error) {
//     console.error('Error sending OTP', error);
//     // Handle error accordingly
//   }
// };


// export const handleVerifyOtp = async (verificationId, otp) =>{
//     const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
//     await auth.signInWithCredential(credential);

//     // Store login details to Firestore
//     const user = auth.currentUser;
//     await Firestore.collection('users').doc(user.uid).set({
//       phone: user.phoneNumber,
//       lastLogin: new Date(),
//     });
//   };