import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = ({ show, token }) => {

  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  if (!show) {
    return null;
  }


  const authors = result.data?.allAuthors || [];


  const submit = async (event) => {
    event.preventDefault();

    if (birthYear > 1000 && birthYear < 2000) {
      updateAuthor({ variables: { name, setBornTo: Number(birthYear) } });
    }

    setName("");
    setBirthYear("");

  };

  return (
    <div>
      <h2>authors</h2>
      {result.loading ? <h4>loading...</h4> : <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>}

      {token &&
        <div>
          <h1>Set birthyear</h1>
          <form onSubmit={submit}>
            <div>
              name
              <select value={name} onChange={({ target }) => setName(target.value)}>
                <option value="" disabled>Select an author</option>
                {authors.map(author => <option key={author.name}>{author.name}</option>)}
              </select>
            </div>
            <div>
              born
              <input
                type="number"
                value={birthYear}
                onChange={({ target }) => setBirthYear(target.value)}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </div>
      }


    </div>
  );
};

export default Authors;
