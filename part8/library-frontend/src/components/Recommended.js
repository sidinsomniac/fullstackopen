import { useQuery } from "@apollo/client";
import React from 'react';
import { ALL_BOOKS } from "../queries";

const Recommended = ({ show, user }) => {

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: user?.favoriteGenre }
  });


  if (!show) {
    return null;
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user?.favoriteGenre}</strong></p>

      {result.data?.loading ?
        <p>loading...</p> :
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
            {result.data.allBooks.map(a =>
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