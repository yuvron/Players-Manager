import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage/PlayersPage";
import AgentsPage from "./pages/AgentsPage/AgentsPage";
import PlayersProvider from "./context/PlayersContext";
import AgentsProvider from "./context/AgentsContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<>
		<BrowserRouter>
			<nav>
				<NavLink to="/">Players</NavLink>
				<NavLink to="/agents" className={({ isActive }) => (isActive ? "active" : "")}>
					Agents
				</NavLink>
			</nav>
			<Routes>
				<Route
					path="/"
					element={
						<PlayersProvider>
							<PlayersPage />
						</PlayersProvider>
					}
				/>
				<Route
					path="/agents"
					element={
						<AgentsProvider>
							<AgentsPage />
						</AgentsProvider>
					}
				/>
			</Routes>
		</BrowserRouter>
	</>
);
