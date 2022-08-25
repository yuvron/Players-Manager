import "./PlayersTable.scss";
import Loader from "../Loader/Loader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { Player } from "../../api/players";
import { usePlayers } from "../../context/PlayersContext";

interface PlayersTableProps {
	handleEdit: (player: Player) => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({ handleEdit }) => {
	const { players, deletePlayer } = usePlayers();

	const renderPlayers = () => {
		return players.map((player) => {
			return (
				<tr key={player.id}>
					{Object.entries(player).map(([key, value]) => {
						let formattedValue = value;
						if (typeof value === "number") formattedValue = value.toLocaleString();
						if (Array.isArray(value)) formattedValue = value.join(", ");
						return (
							<td key={key} className={`user-${key}`}>
								{formattedValue}
							</td>
						);
					})}
					<td>
						<ActionButtons onEdit={() => handleEdit(player)} onDelete={() => deletePlayer(player.id)} />
					</td>
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
