import { useState } from "react";
import "./DataTable.scss";
import Loader from "../Loader/Loader";
import ActionButtons from "../ActionButtons/ActionButtons";
import { Player } from "../../api/players";
import { Agent } from "../../api/agents";
import { usePlayers } from "../../context/PlayersContext";
import { useAgents } from "../../context/AgentsContext";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

interface DataTableProps {
	handleEdit: (data: any) => void;
	dataType: "players" | "agents";
}

const DataTable: React.FC<DataTableProps> = ({ dataType, handleEdit }) => {
	const [sortType, setSortType] = useState<string | undefined>(undefined);
	const [sortOrder, setSortOrder] = useState(0);
	let data: Player[] | Agent[];
	let deleteData: (id: number) => Promise<void>;
	let sortData: (sortType: string, sortOrder: number) => void;
	if (dataType === "players") {
		const context = usePlayers();
		[data, deleteData, sortData] = [context.players, context.deletePlayer, context.sortPlayers];
	} else {
		const context = useAgents();
		[data, deleteData, sortData] = [context.agents, context.deleteAgent, context.sortAgents];
	}

	const handleSort = (newSortType: string) => {
		if (sortType === newSortType) {
			setSortOrder(sortOrder * -1);
			sortData(newSortType, sortOrder * -1);
		} else {
			setSortType(newSortType);
			setSortOrder(1);
			sortData(newSortType, 1);
		}
	};

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
						return (
							<th key={key} onClick={() => handleSort(key)}>
								{formattedKey}
								{sortType === key && (sortOrder === 1 ? <GoTriangleUp className="sort-angle" /> : <GoTriangleDown className="sort-angle" />)}
							</th>
						);
					})}
					<th key="actions">Actions</th>
				</>
			);
		}
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
