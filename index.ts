import express, { Application } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const { ApolloServer, gql } = require("apollo-server-express");
import cors from "cors";
import { connectDB } from "./database";
import { ContactModel } from "./models";

//database
connectDB();

// Construct a schema, using GraphQL schema language

interface Contact {
  username: string;
  tel: string;
  id?: string;
}

const typeDefs = gql(`

  type Contact {
      username: String!
      tel: String!
      id: String!
  }

  type Query {
    allContacts: [Contact]!
    findContact(name: String!): Contact
  
  }

  type Mutation {
    addContact(
      username: String!
      tel: String!
    ): Contact
  }


`);

const resolvers = {
  Query: {
    async allContacts(root: Contact, data: any, models: any) {
      return models.ContactModel.findAll();
    },
    findContact: (root: any, args: any, models: any) => {
      const { name } = args;
      return models.ContactModel.findOne({ where: { username: name } });
    },
  },
  Mutation: {
    async addContact(root: Contact, data: any, models: any) {
      const contact = data;
      return await models.ContactModel.create(contact);
    },
  },
};

const app: Application = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { ContactModel },
  });

  app.use(cors());
  await server.start();

  server.applyMiddleware({ app });
};

startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server encendido en http://localhost:${4000}/graphql`);
});
