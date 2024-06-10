import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
  // State to track the visibility of the answer
  const [showAnswer, setShowAnswer] = useState(true);

  // Function to toggle the visibility of the answer
  const toggleAnswerVisibility = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>HRQuestions</Text>
          <View style={styles.headerIcons}>
            {/* Placeholder for icons */}
            <Text style={styles.icon}>🔔</Text>
            <Text style={styles.icon}>🏠</Text>
          </View>
        </View>

        {/* Question and Answer Section */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>what is exception handling?</Text>
          {showAnswer && (
            <Text style={styles.answerText}>
              Exception handling is a programming concept used to manage and respond to runtime errors.
            </Text>
          )}
          {/* Button to toggle the visibility of the answer */}
          <TouchableOpacity style={styles.button} onPress={toggleAnswerVisibility}>
            <Text style={styles.buttonText}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Text>
          </TouchableOpacity>
          {/* Button for the next question */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next Question</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>FAQs</Text>
          <Text style={styles.footerText}>Blogs</Text>
          <Text style={styles.footerText}>Placements</Text>
          <Text style={styles.footerText}>Contact Us</Text>
          <Text style={styles.footerText}>About Us</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures the SafeAreaView takes up the full height of the screen
    backgroundColor: '#fff', // Background color of the SafeAreaView
  },
  container: {
    flex: 1, // Ensures the container takes up the full height of the SafeAreaView
    justifyContent: 'space-between', // Distributes space between child elements
  },
  header: {
    flexDirection: 'row', // Arranges child elements in a row
    justifyContent: 'space-between', // Distributes space between child elements in the header
    alignItems: 'center', // Aligns child elements in the center vertically
    backgroundColor: '#d633ff', // Background color of the header
    padding: 10, // Padding inside the header
  },
  headerText: {
    fontSize: 20, // Font size of the header text
    color: '#fff', // Color of the header text
  },
  headerIcons: {
    flexDirection: 'row', // Arranges icons in a row
  },
  icon: {
    fontSize: 24, // Font size of the icons
    color: '#fff', // Color of the icons
    marginLeft: 10, // Left margin for spacing between icons
  },
  questionContainer: {
    backgroundColor: '#f2e4ff', // Background color of the question container
    padding: 20, // Padding inside the question container
    margin: 20, // Margin outside the question container
    borderRadius: 10, // Rounded corners for the question container
    alignItems: 'center', // Aligns child elements in the center horizontally
  },
  questionText: {
    fontSize: 18, // Font size of the question text
    marginBottom: 20, // Margin below the question text
    textAlign: 'center', // Centers the text horizontally
  },
  answerText: {
    fontSize: 16, // Font size of the answer text
    marginBottom: 20, // Margin below the answer text
    textAlign: 'center', // Centers the text horizontally
  },
  button: {
    backgroundColor: '#a13bc2', // Background color of the buttons
    padding: 15, // Padding inside the buttons
    borderRadius: 10, // Rounded corners for the buttons
    alignItems: 'center', // Aligns text in the center horizontally
    marginBottom: 10, // Margin below the buttons
    width: '100%', // Full width of the container
  },
  buttonText: {
    color: '#fff', // Color of the button text
    fontSize: 16, // Font size of the button text
  },
  footer: {
    flexDirection: 'row', // Arranges child elements in a row
    justifyContent: 'space-around', // Distributes space between child elements in the footer
    backgroundColor: '#d633ff', // Background color of the footer
    padding: 10, // Padding inside the footer
  },
  footerText: {
    color: '#fff', // Color of the footer text
    fontSize: 14, // Font size of the footer text
  },
});

export default App;