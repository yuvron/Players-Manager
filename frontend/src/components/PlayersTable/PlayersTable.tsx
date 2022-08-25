import "./PlayersTable.scss";
import Loader from "../Loader/Loader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { Player } from "../../api/players";
import { usePlayers } from "../../context/PlayersContext";
import PlayerData from "../PlayerData/PlayerData";

interface PlayersTableProps {
	handleEdit: (player: Player) => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({ handleEdit }) => {
	const { players, deletePlayer } = usePlayers();

	const renderPlayers = () => {
		return players.map((player) => {
			return (
				<tr key={player.id}>
					<PlayerData player={player} />
					<ActionButtons onEdit={() => handleEdit(player)} onDelete={() => deletePlayer(player.id)} />
				</tr>
			);
		});
	};

	const renderHeaders = () => {
		if (players.length > 0) {
			return (
				<>
					{Object.keys(players[0]).map((key) => {
						const formattedKey = key.replaceAll("_", " ");
						return <th key={key}>{formattedKey}</th>;
					})}
					<th key="actions">Actions</th>
				</>
			);
		} else return [];
	};

	return (
		<div className="users-table">
			{players.length === 0 ? (
				<Loader />
			) : (
				<table>
					<thead>
						<tr>{renderHeaders()}</tr>
					</thead>
					<tbody>{renderPlayers()}</tbody>
				</table>
			)}
		</div>
	);
};

export default PlayersTable;
