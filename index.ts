import { MikroORM } from "@mikro-orm/postgresql";
import dotenv from "dotenv";
import express, { Express } from "express";
import mikroOrmConfig from "./mikro-orm.config";

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
    console.log(`⚡️ Server is running at http://localhost:${port}`);
  });
})();
