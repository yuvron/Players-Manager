import axios, { AxiosError } from "axios";
import { errorHandler } from "./errorHandler";

export const apiGetAgents = async () => {
	try {
		const { data } = await axios.get("/api/agents");
		return data;
	} catch (e) {
		errorHandler(e as AxiosError);
	}
};
