import axios from "axios"

export const sendDetails = async(data) =>{
    try {
        const response = await axios.post('',data)
        return response.data
    } catch (error) {
        throw error;
    }
}