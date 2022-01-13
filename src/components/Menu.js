import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"

const Menu = () => {
    return (
        <div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link to="/">Main Page</Link>
                    <Link to="/favorites">Favorites</Link>
                </li>
            </ul>

        </div>
    );
}

export default Menu;