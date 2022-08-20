import axios, { AxiosError } from "axios";
import { errorHandler } from "./errorHandler";

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
	try {
		const { data } = await axios.get("/api/players");
		return data;
	} catch (e) {
		errorHandler(e as AxiosError);
	}
};

export const apiCreatePlayer = async (player: Player) => {
	try {
		const { data } = await axios.post("/api/players", { ...player });
		return data;
	} catch (e) {
		errorHandler(e as AxiosError);
	}
};

export const apiUpdatePlayer = async (id: number, player: Player) => {
	try {
		const { data } = await axios.put(`/api/players/${id}`, { ...player });
		return data;
	} catch (e) {
		errorHandler(e as AxiosError);
	}
};

export const apiDeletePlayer = async (id: number) => {
	try {
		const { data } = await axios.delete(`/api/players/${id}`);
		return data;
	} catch (e) {
		errorHandler(e as AxiosError);
	}
};
