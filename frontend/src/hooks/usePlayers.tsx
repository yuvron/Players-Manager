import { useEffect, useState } from "react";
import { Player, apiGetPlayers, apiCreatePlayer, apiUpdatePlayer, apiDeletePlayer } from "../api/players";

const usePlayers = () => {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		apiGetPlayers().then((data: Player[]) => setPlayers(data));
	}, []);

	const createPlayer = async (player: Player) => {
		const newPlayer = await apiCreatePlayer(player);
		setPlayers([...players, newPlayer]);
	};

	const updatePlayer = async (id: number, player: Player) => {
		const updatedPlayer = await apiUpdatePlayer(id, player);
		const index = players.indexOf(players.find((p) => p.id === id)!);
		const playersCopy = [...players];
		playersCopy.splice(index, 1, updatedPlayer);
		setPlayers(playersCopy);
	};

	const deletePlayer = async (id: number) => {
		await apiDeletePlayer(id);
		setPlayers(players.filter((p) => p.id !== id));
	};

	return [players, createPlayer, updatePlayer, deletePlayer] as const;
};

export default usePlayers;
