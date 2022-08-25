import { Player } from "../../api/players";

interface PlayerDataProps {
	player: Player;
}

const PlayerData: React.FC<PlayerDataProps> = ({ player }) => {
	return (
		<>
			{Object.entries(player).map(([key, value]) => {
				let formattedValue = value;
				if (typeof value === "number") formattedValue = value.toLocaleString();
				if (Array.isArray(value)) formattedValue = value.join(", ");
				return (
					<td key={key} className={`player-${key}`}>
						{formattedValue}
					</td>
				);
			})}
		</>
	);
};

export default PlayerData;
