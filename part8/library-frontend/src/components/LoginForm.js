import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { useEffect } from "react";
import { useCurrentUserQuery } from "../customHook";
import { LOGIN } from "../queries";

function LoginForm({ show, setToken, setPage, setUser }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
        }
    });
    const userService = useCurrentUserQuery(setUser);

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
            setUsername('');
            setPassword('');
            setPage('authors');
            userService.getAndSetUser();
        }
        // eslint-disable-next-line
    }, [result.data]);


    if (!show) {
        return null;
    }

    const login = e => {
        e.preventDefault();
        loginUser({ variables: { username, password } });
        console.log({ username, password });
    };


    return (
        <div>
            <form onSubmit={login}>
                <div>
                    Username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
}

export default LoginForm;
