import { useAgents } from "../../context/AgentsContext";
import { useState } from "react";
import "./AgentsPage.scss";
import DataTable from "../../components/DataTable/DataTable";
import AddButton from "../../components/AddButton/AddButton";
import { Agent } from "../../api/agents";
import Modal from "../../components/Modal/Modal";

const AgentsPage: React.FC = () => {
	const { createAgent, updateAgent } = useAgents();
	const [isAdding, setIsAdding] = useState(false);
	const [editedAgent, setEditedAgent] = useState<Agent | undefined>(undefined);

	return (
		<div className="agents-page">
			<AddButton text="Add Agent" handleClick={() => setIsAdding(true)} />
			<DataTable dataType="agents" handleEdit={setEditedAgent} />
			{isAdding && (
				<Modal handleClose={() => setIsAdding(false)}>
					{/* <PlayerForm
						handleSubmit={async (player: Player) => {
							await createPlayer(player);
							setIsAdding(false);
						}}
					/> */}
					Add an agent
				</Modal>
			)}
			{editedAgent && (
				<Modal handleClose={() => setEditedAgent(undefined)}>
					{/* <PlayerForm
						handleSubmit={async (player: Player) => {
							await updatePlayer(player.id, player);
							setEditedPlayer(undefined);
						}}
						player={editedPlayer}
					/> */}
					Edit an agent
				</Modal>
			)}
		</div>
	);
};

export default AgentsPage;
