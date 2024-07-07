import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

const App = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = () => {
    if (!name || !instituteName || !mobileNumber) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      setShowOtpField(true);
    }
  };

  const handleOtpSubmit = () => {
    if (otp === '123456') { // Assuming '123456' is the correct OTP for demo purposes
      Alert.alert('Success', 'You are now logged in!');
      // Here, you can add further actions such as navigating to another screen
    } else {
      Alert.alert('Error', 'Please enter a valid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>BodhaSoft</Text>

        <View style={styles.loginContainer}>
          <Text style={styles.loginHeading}>Login</Text>
        
          {!showOtpField && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your institute name"
                placeholderTextColor="#999"
                value={instituteName}
                onChangeText={setInstituteName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login ➜</Text>
              </TouchableOpacity>
            </>
          )}

          {showOtpField && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your OTP"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.loginButton} onPress={handleOtpSubmit}>
                <Text style={styles.loginButtonText}>Submit OTP ➜</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A020F0',
    marginVertical: 20,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#F0E6FF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  loginHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountText: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  createAccountText: {
    color: '#A020F0',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#A020F0',
    borderWidth: 1,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#A020F0',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;