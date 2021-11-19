import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { contacts } from "./data";
import cors from "cors";
// Construct a schema, using GraphQL schema language

const schema = buildSchema(`

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

var root = {
  allContacts: () => {
    return contacts;
  },
  findContact: (args: any) => {
    const { name } = args;
    return contacts.find((n) => n.username == name);
  },
  addContact: (args: any) => {
    const contact = { ...args, id: Date.now().toString() };
    contacts.push(contact);
    return contact;
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
