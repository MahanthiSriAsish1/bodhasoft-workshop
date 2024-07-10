import axios from "axios"

export const getQuestions = async()=>{
    try {
        const response = await axios.get('')
        return response.data;
    } catch (error) {
        throw error;
    }
}