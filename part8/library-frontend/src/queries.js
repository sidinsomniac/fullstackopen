import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
            title
            id
            published
            genres
            author {
                name
                id
            }
        }
`;

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`;

export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author:$author, genre:$genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title:$title,
            published:$published,
            author:$author,
            genres:$genres,
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor (name: $name, setBornTo: $setBornTo) {
            name
            born
            id
          }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;