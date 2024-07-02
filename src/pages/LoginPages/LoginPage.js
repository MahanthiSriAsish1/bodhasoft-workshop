import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../config/FirebaseConfig'



const LoginPage = () => {
  const [phone, setPhone] = useState('')

  const sendOtp = () =>{
    try {
      const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
      const confirmation = signInWithPhoneNumber(auth,phone,recaptcha)
      console.log(confirmation);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={setPhone}
      />
      <button onClick={sendOtp}>Send otp</button>
      <div id='recaptcha'></div>
    </div>
  )
}

export default LoginPage