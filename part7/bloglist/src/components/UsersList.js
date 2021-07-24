import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

function UsersList() {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(setUsers());
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length && users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default UsersList;
