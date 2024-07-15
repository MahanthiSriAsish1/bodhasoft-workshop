import axios from "axios"

export const sendDetails = async(data) =>{
    try {
        const response = await axios.post('http://bodhasoftworkshop.in/api/insert',data)
        return response.data
    } catch (error) {
        throw error;
    }
}