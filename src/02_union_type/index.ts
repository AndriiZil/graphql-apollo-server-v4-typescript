import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  union SearchResult = Book | Author

  type Book {
    title: String!
  }
  
  type Author {
    name: String!
  }
  
  type Query {
    search(contains: String): [SearchResult!]
  }
`;

const resolvers = {
  SearchResult: {
    __resolveType(obj, contextValue, info){
      // Only Author has a name field
      if (obj.name) {
        return 'Author';
      }
      // Only Book has a title field
      if (obj.title) {
        return 'Book';
      }

      return null; // GraphQLError is thrown
    },
  },
  Query: {
    search: (parent, args, context, info) => {

      console.log({ parent });
      console.log({ args });
      console.log({ context });
      console.log({ info });
      // Implement your search resolver logic here
      // You should return an array of SearchResult (Book or Author)
      // Example:
      // const results = [/* Your search results */];
      // return results;
    },
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
