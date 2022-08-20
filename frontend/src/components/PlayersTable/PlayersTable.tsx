import "./PlayersTable.scss";
import Loader from "../Loader/Loader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { Player } from "../../api/players";

interface PlayersTableProps {
	players: Player[];
	handleEdit: (player: Player) => void;
	handleDelete: (id: number) => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({ players, handleEdit, handleDelete }) => {
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
						<ActionButtons onEdit={() => handleEdit(player)} onDelete={() => handleDelete(player.id)} />
					</td>
				</tr>
			);
		});
	};

	const renderHeaders = () => {
		if (players[0]) {
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

	if (players.length === 0) {
		return (
			<div className="users-table">
				<Loader />;
			</div>
		);
	}
	return (
		<div className="users-table">
			<table>
				<thead>
					<tr>{renderHeaders()}</tr>
				</thead>
				<tbody>{renderPlayers()}</tbody>
			</table>
		</div>
	);
};

export default PlayersTable;
