import { AxiosResponse, AxiosError } from "axios";

export async function responseHandler(request: Promise<AxiosResponse>) {
	try {
		const { data } = await request;
		return data;
	} catch (err) {
		const axiosError = err as AxiosError;
		if (axiosError.response && axiosError.response.status === 500) location.reload();
		else console.log(axiosError.message);
	}
}
