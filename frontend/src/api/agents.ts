import axios from "axios";
import { responseHandler } from "./handlers";

export interface Agent {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export const apiGetAgents = async () => {
	const request = axios.get("/api/agents");
	return responseHandler(request);
};

export const apiCreateAgent = async (agent: Agent) => {
	const request = axios.post("/api/agents", { ...agent });
	return responseHandler(request);
};

export const apiUpdateAgent = async (id: number, agent: Agent) => {
	const request = axios.put(`/api/agents/${id}`, { ...agent });
	return responseHandler(request);
};

export const apiDeleteAgent = async (id: number) => {
	const request = axios.delete(`/api/agents/${id}`);
	return responseHandler(request);
};
