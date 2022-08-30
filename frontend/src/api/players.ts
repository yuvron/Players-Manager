import axios from "axios";
import { responseHandler } from "./handlers";

export interface Player {
	id: number;
	first_name: string;
	last_name: string;
	age: number;
	nationality: string;
	club: string;
	position: string;
	wage: number;
	value: number;
	clubs_history: string[];
	agent_id: number;
}

export const apiGetPlayers = async () => {
	const request = axios.get("/api/players");
	return responseHandler(request);
};

export const apiCreatePlayer = async (player: Player) => {
	const request = axios.post("/api/players", { ...player });
	return responseHandler(request);
};

export const apiUpdatePlayer = async (id: number, player: Player) => {
	const request = axios.put(`/api/players/${id}`, { ...player });
	return responseHandler(request);
};

export const apiDeletePlayer = async (id: number) => {
	const request = axios.delete(`/api/players/${id}`);
	return responseHandler(request);
};
