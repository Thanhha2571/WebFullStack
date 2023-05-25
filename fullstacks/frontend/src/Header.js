import "./Header.css";
import { NavLink } from "react-router-dom"
function Header() {

    return (
        <div className = "header">
            <nav id="navbar">
                <ul className="nav">
                    <li className="logo">
                        <a >Sportify</a>
                    </li>
                    <li className="item">
                        <NavLink to="/welcome-section">About us</NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/song-list">Song List</NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li className="item button">
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li className="item button secondary">
                        <NavLink to="/login">Log in</NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    )
}
export default Header