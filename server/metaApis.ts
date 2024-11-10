import axios from "axios";

export class MetaApis {
    backendUrl = 'http://localhost:4006'
    intializeFacebookOauth = async () => {
        try {
            return await axios.get(`${this.backendUrl}/api/v1/meta_auth/facebook`, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }

    selectPages = async (pages: string[]) => {
        try {
            return await axios.post(`${this.backendUrl}/api/v1/auth/facebook/selectPage`, {pages}, {withCredentials: true});
        } catch (error) {
            console.log(error);
        }
    }
}