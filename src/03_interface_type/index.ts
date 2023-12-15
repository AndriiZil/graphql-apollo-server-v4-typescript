import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  type Author {
    name: String!
    description: String!
  }
  
  type Course {
    name: String!
    description: String!
  }

  interface Book {
    title: String!
    author: Author!
  }

  type Textbook implements Book {
    title: String!
    author: Author!
    courses: [Course!]!
  }

  type ColoringBook implements Book {
    title: String!
    author: Author!
    colors: [String!]!
  }

  type Query {
    books: [Book!]!
  }
`;

const resolvers = {
  Book: {
    __resolveType(book, contextValue, info){
      // Only Textbook has a courses field
      if (book.courses) {
        return 'Textbook';
      }
      // Only ColoringBook has a colors field
      if (book.colors) {
        return 'ColoringBook';
      }

      return null; // GraphQLError is thrown
    },
  },
  Query: {
    books: (parent, args, context, info) => {
      console.log({ parent });
      console.log({ args });
      console.log({ context });
      console.log({ info });
    }
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
