import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PlayersPage from "./pages/PlayersPage/PlayersPage";
import AgentsPage from "./pages/AgentsPage/AgentsPage";
import PlayersProvider from "./context/PlayersContext";
import AgentsProvider from "./context/AgentsContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<>
		<BrowserRouter>
			<Navbar />
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
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	</>
);
