import { useAgents } from "../../context/AgentsContext";
import { useState } from "react";
import "./AgentsPage.scss";
import DataTable from "../../components/DataTable/DataTable";
import AddButton from "../../components/AddButton/AddButton";
import { Agent } from "../../api/agents";
import Modal from "../../components/Modal/Modal";
import AgentForm from "../../components/AgentForm/AgentForm";

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
					<AgentForm
						handleSubmit={async (agent: Agent) => {
							await createAgent(agent);
							setIsAdding(false);
						}}
					/>
				</Modal>
			)}
			{editedAgent && (
				<Modal handleClose={() => setEditedAgent(undefined)}>
					<AgentForm
						handleSubmit={async (agent: Agent) => {
							await updateAgent(agent.id, agent);
							setEditedAgent(undefined);
						}}
						agent={editedAgent}
					/>
				</Modal>
			)}
		</div>
	);
};

export default AgentsPage;
