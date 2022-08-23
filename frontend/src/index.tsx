import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage/PlayersPage";
import AgentsPage from "./pages/AgentsPage/AgentsPage";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PlayersPage />} />
			<Route path="/agents" element={<AgentsPage />} />
		</Routes>
	</BrowserRouter>
);
