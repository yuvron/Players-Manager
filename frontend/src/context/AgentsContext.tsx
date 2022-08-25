import { useState, useEffect, useContext, createContext } from "react";
import { Agent, apiGetAgents } from "../api/agents";

interface AgentContextState {
	agents: Agent[];
	createAgent: (agent: Agent) => Promise<void>;
	updateAgent: (id: number, agent: Agent) => Promise<void>;
	deleteAgent: (id: number) => Promise<void>;
}

const AgentsContext = createContext<AgentContextState | undefined>(undefined);

export const useAgents = () => {
	const context = useContext(AgentsContext);
	if (context) {
		return context;
	} else {
		throw new Error("useAgents must be within AgentsProvider");
	}
};

const AgentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [agents, setAgents] = useState<Agent[]>([]);

	useEffect(() => {
		apiGetAgents().then((data: Agent[]) => setAgents(data));
	}, []);

	const createAgent = async (agent: Agent) => {
		// const newAgent = await apiCreateAgent(agent);
		// setAgents([...agents, newAgent]);
	};

	const updateAgent = async (id: number, agent: Agent) => {
		// const updatedAgent = await apiUpdateAgent(id, agent);
		// const index = agents.indexOf(agents.find((a) => a.id === id)!);
		// const agentsCopy = [...agents];
		// agentsCopy.splice(index, 1, updatedAgent);
		// setAgents(agentsCopy);
	};

	const deleteAgent = async (id: number) => {
		// await apiDeleteAgent(id);
		// setAgents(agents.filter((a) => a.id !== id));
	};

	return (
		<AgentsContext.Provider value={{ agents, createAgent, updateAgent, deleteAgent }}>
			{children}
		</AgentsContext.Provider>
	);
};

export default AgentsProvider;
