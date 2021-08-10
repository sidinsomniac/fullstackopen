const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const pubsub = new PubSub();

const MONGODB_URI = 'mongodb+srv://sid:qwerty1234@fullstackopen.msbpa.mongodb.net/library?retryWrites=true&w=majority';
const JWT_KEY = 'SECRET_KEY';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log('connected to MongoDB');
}).catch((error) => {
    console.log('error connection to MongoDB:', error.message);
});

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
    type User {
        username: String!
        favoriteGenre: String!
    }
    type Token {
        value: String!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    type Subscription {
        bookAdded: Book!
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
        },
        me: async (root, args, { currentUser }) => {
            return currentUser;
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {

            // if (!currentUser) {
            //     throw new AuthenticationError('not authenticated');
            // }

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
            pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author').execPopulate() });
            return book.populate('author').execPopulate();
        },
        editAuthor: async (root, args, { currentUser }) => {

            if (!currentUser) {
                throw new AuthenticationError('not authenticated');
            }

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
        createUser: (root, args) => {
            const user = new User({ ...args });
            return user.save().catch(err => {
                throw new UserInputError(err.message, {
                    invalidArgs: args,
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials');
            }

            const userForToken = {
                username: user.username,
                id: user._id
            };

            return { value: jwt.sign(userForToken, JWT_KEY) };
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_KEY
            );
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    }
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
