import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar({ user, handleLogout }) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">blogs</Link>
                </li>
                <li>
                    <Link to="/users">users</Link>
                </li>
                <li>
                    <p>{user.name} has logged in <button onClick={handleLogout}>logout</button></p>
                </li>
            </ul>
        </div>
    );
}
