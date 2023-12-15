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
  
  type User {
    name: String!
  }

  type Query {
    books: [Book!]!
  }
  
  type Mutation {
    addBook(title: String, author: String): Book
  }
  
  input BlogPostContent {
    title: String
    body: String
    media: [MediaDetails!]
  }

  input MediaDetails {
    format: MediaFormat!
    url: String!
  }

  enum MediaFormat {
    IMAGE
    VIDEO
  }
  
  enum AllowedColor {
    RED
    GREEN
    BLUE
  }
  
  type Query {
    avatar(borderColor: AllowedColor): String
  }
  
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  
  type UpdateUserEmailMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
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
  AllowedColor: {
    RED: '#f00',
    GREEN: '#0f0',
    BLUE: '#00f',
  },
  Query: {
    books: () => books,
    avatar: (parent, args) => {
      console.log({parent});
      console.log({args});

      return 'Avatar';
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
