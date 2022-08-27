import "./DataTable.scss";
import Loader from "../Loader/Loader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { Player } from "../../api/players";
import { Agent } from "../../api/agents";
import { usePlayers } from "../../context/PlayersContext";
import { useAgents } from "../../context/AgentsContext";

interface DataTableProps {
	handleEdit: (data: any) => void;
	dataType: "players" | "agents";
}

const DataTable: React.FC<DataTableProps> = ({ dataType, handleEdit }) => {
	let data: Player[] | Agent[];
	let deleteData: (id: number) => Promise<void>;
	if (dataType === "players") {
		const context = usePlayers();
		[data, deleteData] = [context.players, context.deletePlayer];
	} else {
		const context = useAgents();
		[data, deleteData] = [context.agents, context.deleteAgent];
	}

	const renderData = () => {
		return data.map((item) => {
			return (
				<tr key={item.id}>
					{Object.entries(item).map(([key, value]) => {
						let formattedValue = value;
						if (typeof value === "number") formattedValue = value.toLocaleString();
						if (Array.isArray(value)) formattedValue = value.join(", ");
						return (
							<td key={key} className={`data-${key}`}>
								{formattedValue}
							</td>
						);
					})}
					<ActionButtons onEdit={() => handleEdit(item)} onDelete={() => deleteData(item.id)} />
				</tr>
			);
		});
	};

	const renderHeaders = () => {
		if (data[0]) {
			return (
				<>
					{Object.keys(data[0]).map((key) => {
						const formattedKey = key.replaceAll("_", " ");
						return <th key={key}>{formattedKey}</th>;
					})}
					<th key="actions">Actions</th>
				</>
			);
		} else return [];
	};

	return (
		<div className="data-table">
			{data.length === 0 ? (
				<Loader />
			) : (
				<table>
					<thead>
						<tr>{renderHeaders()}</tr>
					</thead>
					<tbody>{renderData()}</tbody>
				</table>
			)}
		</div>
	);
};

export default DataTable;
