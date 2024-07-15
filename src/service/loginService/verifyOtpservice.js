// const verifyOtp = async (confirmationResult, otp) => {
//   try {
//     const response = await confirmationResult.confirm(otp);
//     // console.log(response);
//     // If confirmation succeeds, return true or any appropriate data
//     return true; // or return any other data that indicates successful verification
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     if (error.code === 'auth/invalid-verification-code') {
//       // Handle invalid verification code error
//       throw new Error('Invalid OTP. Please enter a valid OTP.');
//     } else if (error.code === 'auth/missing-verification-code') {
//       // Handle missing verification code error
//       throw new Error('Verification code is missing. Please enter the OTP.');
//     } else {
//       // Handle other errors
//       throw error; // Propagate other errors to handle in the caller component
//     }
//   }
// };

// export default verifyOtp;



const verifyOtp = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    console.log('User verified:', result.user);
    return result.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; // Propagate error to handle in the caller component
  }
};

export default verifyOtp;
