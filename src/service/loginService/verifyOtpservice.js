

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
  