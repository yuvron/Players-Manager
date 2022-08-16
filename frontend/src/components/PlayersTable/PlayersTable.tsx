import "./PlayersTable.scss";
import Loader from "../Loader/Loader";
import usePlayers from "../../hooks/usePlayers";

const PlayersTable: React.FC = () => {
	const players = usePlayers();

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
				</tr>
			);
		});
	};

	const renderHeaders = () => {
		if (players[0]) {
			return Object.keys(players[0]).map((key) => {
				const formattedKey = key.replaceAll("_", " ");
				return <th key={key}>{formattedKey}</th>;
			});
		} else return [];
	};

	if (players.length === 0) return <Loader />;
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
