// src/pistonService.js
import axios from 'axios';
import { runtimeService } from './runtimeService';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export const executeCode = async (language, code) => {
  try {
    // Fetch runtime information
    const { version, alias } = await runtimeService({ language });

    // Construct payload for the POST request
    const payload = {
      language: language,
      version: version,
      files: [{ name: `main.${alias || 'txt'}`, content: code }]
    };

    // Send POST request to PISTON API
    const response = await axios.post(PISTON_API_URL, payload);
    return response.data.run.output
  } catch (error) {
    // Handle and log errors
    console.error('Error executing code:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};
