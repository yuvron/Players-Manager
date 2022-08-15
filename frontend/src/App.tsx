import { useState } from "react";
import "./App.scss";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import AddPlayerButton from "./components/AddPlayerButton/AddPlayerButton";
import Modal from "./components/Modal/Modal";
import AddPlayerForm from "./components/AddPlayerForm/AddPlayerForm";

const App: React.FC = () => {
	const [isAdding, setIsAdding] = useState(false);

	return (
		<div className="app">
			<AddPlayerButton handleClick={() => setIsAdding(true)} />
			<PlayersTable />
			{isAdding && (
				<Modal handleClose={() => setIsAdding(false)}>
					<AddPlayerForm handlePlayerAdded={() => setIsAdding(false)} />
				</Modal>
			)}
		</div>
	);
};

export default App;
