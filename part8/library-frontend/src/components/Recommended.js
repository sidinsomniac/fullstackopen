import React from 'react';

const Recommended = ({ show, books, user }) => {

  if (!show) {
    return null;
  }

  const { favoriteGenre } = user;
  const recommendedBooks = books.filter(book => book.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      {books.length &&
        (<table>
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
            {recommendedBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>)
      }
    </div>
  );
};

export default Recommended;