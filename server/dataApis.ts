import axios from "axios";

export class DataApis {
    backendUrl = 'https://social-media-integration.onrender.com'
    fetchPages = async () => {
        try {
            return await axios.get(`${this.backendUrl}/api/v1/lead`, {withCredentials: true})
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}