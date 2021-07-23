import React, { useEffect, useState } from "react";
import userServices from "../services/users";

function UserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const blogUsers = await userServices.getAll();
        console.log("Users 😅❤😁", blogUsers);
        setUsers(blogUsers);
    }, []);
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetails;
