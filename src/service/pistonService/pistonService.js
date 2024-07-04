// src/pistonService.js
import axios from 'axios';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export const executeCode = async (language, version, code) => {
  try {
    const response = await axios.post(PISTON_API_URL, {
      language: language,
      version: version,
      files: [{ name: 'main', content: code }]
    });
    return response.data;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};
