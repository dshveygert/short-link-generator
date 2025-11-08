import { env } from "@/common/utils/envConfig";
import Knex from "knex";
import { Model } from "objection";

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_HOST } = env;
const pgConfig = {
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  host: POSTGRES_HOST,
};

// Initialize knex.
const knex = Knex({
  client: "pg",
  useNullAsDefault: true,
  connection: {
    ...pgConfig,
  },
});

// Give the knex instance to objection.
Model.knex(knex);

export default knex;
