const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { v1: uuid } = require('uuid');
const Book = require('./models/book');
const Author = require('./models/author');

const MONGODB_URI =
    'mongodb+srv://sid:qwerty1234@fullstackopen.msbpa.mongodb.net/library?retryWrites=true&w=majority';

console.log('connecting to', MONGODB_URI);

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
    });

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3a',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3b',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3c',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky',
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3d',
    },
    {
        name: 'Sandi Metz',
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution'],
    },
];

Author.insertMany(authors);
Book.insertMany(books);

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]!
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!(args.author || args.genre)) return Book.find({});
            // else if (args.author && !args.genre)
            //     return books.filter((book) => book.author === args.author);
            // else if (args.genre && !args.author)
            //     return books.filter((book) => book.genres.includes(args.genre));
            // else if (args.genre && args.author)
            //     return books.filter(
            //         (book) =>
            //             book.author === args.author &&
            //             book.genres.includes(args.genre)
            //     );
        },
        allAuthors: () => {
            return Author.find({});
            // return authors.map((author) => ({
            //     ...author,
            //     bookCount: books.filter((book) => book.author === author.name)
            //         .length,
            // }));
        },
    },
    Mutation: {
        addBook: (root, args) => {
            const book = new Book({ ...args });
            return book.save();
            // const savedAuthor = authors.filter(
            //     (author) => author.name === args.author
            // );
            // if (!savedAuthor.length) {
            //     authors = authors.concat({ name: args.author, id: uuid() });
            // }
        },
        editAuthor: (root, args) => {
            const foundAuthor = Author.findOne({ name: args.name });
            // const foundAuthor = authors.find(
            //     (author) => author.name === args.name
            // );
            foun;
            if (!foundAuthor) return null;
            foundAuthor.born = args.setBornTo;
            return foundAuthor.save();
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
