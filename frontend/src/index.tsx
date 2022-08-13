import ReactDOM from "react-dom/client";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import AddPlayerButton from "./components/AddPlayerButton/AddPlayerButton";
import "./index.scss";

function App() {
	return (
		<div className="app">
			<AddPlayerButton />
			<PlayersTable />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
