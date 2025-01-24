import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export class AuthApis {
	backendUrl = useRuntimeConfig().public.apiBaseUrl;
	// login
	login = async (userData: {
		email: string;
		password: string;
		role: string;
	}) => {
		try {
			return await axios.post(`${this.backendUrl}/api/v1/auth`, {
				...userData,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// register
	register = async (userData: {
		email: string;
		password: string;
		userName: string;
		company: string;
	}) => {
		console.log(userData);

		return await axios.post(`${this.backendUrl}/api/v1/subscriber/register`, {
			...userData,
		});
	};
}
