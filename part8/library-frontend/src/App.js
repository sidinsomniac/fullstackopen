import React, { useState, useEffect } from 'react';
import { useApolloClient } from "@apollo/client";
import Authors from './components/Authors';
import Books from './components/Books';
import Recommended from './components/Recommended';
import LoginForm from "./components/LoginForm";
import NewBook from './components/NewBook';
import { useCurrentUserQuery } from "./customHook";
import { useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const userService = useCurrentUserQuery(setUser);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    const bookAdded = booksInStore.allBooks.map(books => books.id).includes(addedBook.id);
    if (!bookAdded) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: { data: { bookAdded } } }) => {
      alert(`New book added: ${bookAdded.title} (${bookAdded.published}) - by ${bookAdded.author.name}`);
      updateCacheWith(bookAdded);
    }
  });

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