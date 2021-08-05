import React, { useState, useEffect } from 'react';
import { useApolloClient } from "@apollo/client";
import Authors from './components/Authors';
import Books from './components/Books';
import Recommended from './components/Recommended';
import LoginForm from "./components/LoginForm";
import NewBook from './components/NewBook';
import { useCurrentUserQuery } from "./customHook";

const App = () => {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const userService = useCurrentUserQuery(setUser);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    setUser(null);
    setPage('login');
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
      setPage('authors');
      userService.getAndSetUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors token={token}
        show={page === 'authors'}
      />

      <Books show={page === 'books'}
      />

      <Recommended user={user} show={page === 'recommend'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm setToken={setToken} setUser={setUser} setPage={setPage}
        show={page === 'login'}
      />

    </div>
  );
};

export default App;