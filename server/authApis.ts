import axios from "axios"

const backendUrl = 'http://localhost:4006'
export class AuthApis {
    // login
    login = async (userData: { email: string, password: string, role: string }) => {
        try {
            console.log(userData);
            return await axios.post(`${backendUrl}/api/v1/auth`, { ...userData })
        } catch (error) {
            console.log(error);
        }
    }

    // register
    register = async (userData: { email: string, password: string, userName: string, company: string}) => {
        return await axios.post(`${backendUrl}/api/v1/subscriber/register`, { userData })
    }
}