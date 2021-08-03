const { ApolloServer, gql, UserInputError } = require('apollo-server');
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
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky',
    },
    {
        name: 'Sandi Metz',
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
        author: '61081a8fa328021d2c73d74a',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: '61081a8fa328021d2c73d74a',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: '61081a8fa328021d2c73d74b',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: '61081a8fa328021d2c73d74d',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: '61081a8fa328021d2c73d74e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: '61081a8fa328021d2c73d74c',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: '61081a8fa328021d2c73d74c',
        genres: ['classic', 'revolution'],
    },
];

// Author.insertMany(authors);
// Book.insertMany(books);

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
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author', { name: 1, born: 1 });
            if (!(args.author || args.genre)) return books;
            else if (args.author && !args.genre)
                return books.filter((book) => book.author.name === args.author);
            else if (args.genre && !args.author)
                return books.filter((book) => book.genres.includes(args.genre));
            else if (args.genre && args.author)
                return books.filter(
                    (book) =>
                        book.author.name === args.author &&
                        book.genres.includes(args.genre)
                );
        },
        allAuthors: async () => {
            const authors = await Author.find({});
            const books = await Book.find({});
            const authorObj = authors.map(author => {
                author.bookCount = books.filter(book => String(book.author) === String(author._id)).length;
                return author;
            });
            return authorObj;
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const foundAuthor = await Author.findOne({ name: args.author });
            let author = (!foundAuthor) ? new Author({ name: args.author }) : foundAuthor;
            const book = new Book({ ...args, author: author._id });
            try {
                await book.save();
                !foundAuthor && await author.save();
            } catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args,
                });
            }
            return book;
        },
        editAuthor: async (root, args) => {
            const foundAuthor = await Author.findOne({ name: args.name });
            if (!foundAuthor) return null;
            foundAuthor.born = args.setBornTo;
            try {
                await foundAuthor.save();
            } catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args
                });
            }
            return foundAuthor;
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
