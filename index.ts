import express, { Express, Request, Response } from "express";
import { MikroORM } from "@mikro-orm/postgresql";
import mikroOrmConfig from "./mikro-orm.config";
import dotenv from "dotenv";

dotenv.config();

const initializeOrm = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const migrator = orm.getMigrator();
  // await migrator.up();
  return orm;
};

(async () => {
  const app: Express = express();
  const port = process.env.PORT;

  await initializeOrm();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
})();
