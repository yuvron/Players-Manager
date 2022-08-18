import { useEffect, useState } from "react";
import axios from "axios";

interface Player {
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

const usePlayers = () => {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		getPlayers();
	});

	const getPlayers = () => {
		axios
			.get("/api/players")
			.then((response) => {
				if (response.data.length !== players.length) {
					setPlayers(response.data);
				}
			})
			.catch((err) => {
				if (err.response && err.response.status === 500) location.reload();
				else console.log(err);
			});
	};

	const deletePlayer = (id: number) => {
		axios
			.delete(`/api/players/${id}`)
			.then(() => {
				setPlayers(players.filter((p) => p.id !== id));
			})
			.catch((err) => {
				if (err.response && err.response.status === 500) location.reload();
				else console.log(err);
			});
	};

	return [players, deletePlayer] as const;
};

export default usePlayers;
