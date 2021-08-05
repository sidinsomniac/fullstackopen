import { useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {

  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('all genres');
  const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "all genres"];

  if (!show) {
    return null;
  }

  const books = result.data?.allBooks || [];
  const filteredBooks = books.filter(book => {
    return genre !== "all genres" ? book.genres.includes(genre) : book;
  });

  console.log({ books });

  return (
    <div>
      <p>in genre <strong>{genre}</strong></p>
      <h2>books</h2>

      {result.loading ? <h4>loading...</h4> :
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {filteredBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      }

      <div>
        {
          genres.map(g => <button onClick={() => setGenre(g)}>{g}</button>)
        }
      </div>
    </div>
  );
};

export default Books;