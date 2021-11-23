import express, { Application } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const { ApolloServer, gql } = require("apollo-server-express");
import cors from "cors";
import { connectDB } from "./database";
import { Maquinas, Componentes, Equipos } from "./models";
import {
  ComponentesInterface,
  EquiposInterface,
  MaquinasInterface,
} from "./interfaces";

//database
connectDB();

// Construct a schema, using GraphQL schema language

const typeDefs = gql(`

  type Equipos {
    id: ID!
    modelo: String!
    descripcion: String
  }

  type Componentes {
    id: ID!
    codigo: String!
    comentario: String
    id_maquina: String
    id_componente_mayor: ID
    componentes: [Componentes]
  }

  type Maquinas {
    id: ID!
    codigo: String!
    comentario: String!
    horas_por_dia: Float!
    id_equipo: ID!
    componentes: [Componentes]
    equipo: Equipos
  }

  type Query {
    allMaquinas: [Maquinas]!
  }

  type Mutation {
    createMaquina(
      codigo: String!
      comentario: String!
      horas_por_dia: Float!
      id_equipo: ID!
    ): Maquinas
    createComponente(
      codigo: String!
      comentario: String
      id_maquina: ID
      id_componente_mayor: ID
    ): Componentes
    createEquipo(
      modelo: String!,
      descripcion: String
    ): Equipos
  }


`);

const resolvers = {
  Query: {
    async allMaquinas(root: MaquinasInterface, data: any, models: any) {
      return await models.Maquinas.findAll({
        include: { all: true, nested: true },
      });
    },
  },
  Mutation: {
    async createMaquina(
      root: MaquinasInterface,
      data: MaquinasInterface,
      models: any
    ) {
      return await models.Maquinas.create(data);
    },
    async createComponente(
      root: ComponentesInterface,
      data: ComponentesInterface,
      models: any
    ) {
      return await models.Componentes.create(data);
    },
    async createEquipo(
      root: EquiposInterface,
      data: EquiposInterface,
      models: any
    ) {
      return await models.Equipos.create(data);
    },
  },
};

const app: Application = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Maquinas, Componentes, Equipos },
  });

  app.use(cors());
  await server.start();

  server.applyMiddleware({ app });
};

startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server encendido en http://localhost:${4000}/graphql`);
});
