import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="links">
				<NavLink to="/">
					<i className="fa-solid fa-futbol"></i>
					<span>Players</span>
				</NavLink>
				<NavLink to="/agents">
					<i className="fa-solid fa-user-tie"></i>
					<span>Agents</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
