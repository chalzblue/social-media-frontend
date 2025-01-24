import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export class DataApis {
	backendUrl = useRuntimeConfig().public.apiBaseUrl;
	fetchPages = async () => {
		try {
			return await axios.get(`${this.backendUrl}/api/v1/lead`, {
				withCredentials: true,
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
}
