import { Component } from "react";
import "./App.scss";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import AddPlayerButton from "./components/AddPlayerButton/AddPlayerButton";
import Modal from "./components/Modal/Modal";
import AddPlayerForm from "./components/AddPlayerForm/AddPlayerForm";

interface AppState {
	isAdding: boolean;
}

class App extends Component {
	state: AppState = { isAdding: false };

	onAddClick = () => {
		this.setState({ isAdding: true });
	};

	onAddModalClose = () => {
		this.setState({ isAdding: false });
	};

	onPlayerAdded = () => {
		this.setState({ isAdding: false });
	};

	render() {
		return (
			<div className="app">
				<AddPlayerButton handleClick={this.onAddClick} />
				<PlayersTable />
				{this.state.isAdding && (
					<Modal handleClose={this.onAddModalClose}>
						<AddPlayerForm handlePlayerAdded={this.onPlayerAdded} />
					</Modal>
				)}
			</div>
		);
	}
}

export default App;
