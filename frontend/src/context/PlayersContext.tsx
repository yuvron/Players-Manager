import { useState, useEffect, useContext, createContext } from "react";
import { apiGetPlayers, apiCreatePlayer, apiUpdatePlayer, apiDeletePlayer, Player } from "../api/players";
import positions from "../constants/positions";

interface PlayersContextState {
	players: Player[];
	createPlayer: (player: Player) => Promise<void>;
	updatePlayer: (id: number, player: Player) => Promise<void>;
	deletePlayer: (id: number) => Promise<void>;
	sortPlayers: (sortType: string, sortOrder: number) => void;
}

const PlayersContext = createContext<PlayersContextState | undefined>(undefined);

export const usePlayers = () => {
	const context = useContext(PlayersContext);
	if (context) {
		return context;
	} else {
		throw new Error("usePlayers must be within PlayersProvider");
	}
};

const PlayersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

	const sortPlayers = (sortType: string, sortOrder: number) => {
		const sortKey = sortType as keyof Player;
		const sortedPlayers: Player[] = [...players];
		sortedPlayers.sort((a: Player, b: Player) => {
			if (sortKey === "position") {
				return positions.indexOf(a[sortKey]) > positions.indexOf(b[sortKey]) ? sortOrder : sortOrder * -1;
			} else {
				return a[sortKey] > b[sortKey] ? sortOrder : sortOrder * -1;
			}
		});
		setPlayers(sortedPlayers);
	};

	return <PlayersContext.Provider value={{ players, createPlayer, updatePlayer, deletePlayer, sortPlayers }}>{children}</PlayersContext.Provider>;
};

export default PlayersProvider;
