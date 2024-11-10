import axios from "axios"

export class AuthApis {
    backendUrl = process.env.BACKEND_URL

    // login
    login = async (email: string, password: string) => {
        return await axios.post(`${this.backendUrl}/login`, { email, password })
    }

    // register
    register = async (userData: { email: string, password: string, userName: string, company: string}) => {
        return await axios.post(`${this.backendUrl}/register`, { ...userData })
    }
}