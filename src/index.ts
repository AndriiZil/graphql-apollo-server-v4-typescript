import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  type Book {
    title: String!
    description: String
    isAvailable: Boolean!
    price: Float
    count: Int
    author: String
  }

  type Query {
    books: [Book!]!
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    description: null,
    isAvailable: true,
    count: 8,
    price: 24.98
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    description: null,
    isAvailable: true,
    count: 12,
    price: 32.17
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

    console.log(`🚀 Server listening at: ${url}`);
  } catch (err ) {
    console.log(err);
  }
})();
