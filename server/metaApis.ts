import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export class MetaApis {
	backendUrl = useRuntimeConfig().public.apiBaseUrl;
	intializeFacebookOauth = async () => {
		try {
			// @ts-ignore
			window.location.href = `${this.backendUrl}/auth/facebook`;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	fetchPages = async () => {
		try {
			return await axios.get(
				`${this.backendUrl}/api/v1/meta/facebook/fetchPages`,
				{ withCredentials: true },
			);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	selectPages = async (pages: string[]) => {
		try {
			return await axios.post(
				`${this.backendUrl}/api/v1/meta/facebook/selectPages`,
				{ pages },
				{ withCredentials: true },
			);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	checkIfConnectedWithFacebook = async () => {
		try {
			return await axios.get(`${this.backendUrl}/api/v1/meta/facebook-status`, {
				withCredentials: true,
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
}
