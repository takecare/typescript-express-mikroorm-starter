import dotenv from "dotenv";
dotenv.config();

import { MikroORM } from "@mikro-orm/postgresql";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { session } from "./db";
import mikroOrmConfig from "./mikro-orm.config";
import { User } from "./entities/User";
import { RequestContext } from "@mikro-orm/core";

const initializeOrm = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  return orm;
};

(async () => {
  const app: Express = express();
  const port = process.env.PORT;

  const orm = await initializeOrm();
  session.orm = orm;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // https://stackoverflow.com/a/72799993/1001542
  app.use((_req: Request, _res: Response, next: NextFunction) =>
    RequestContext.create(orm.em, next)
  );

  const userRouter = Router();
  userRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const users = await orm.em.find(User, {});
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });
  userRouter.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    if (!body.username || !body.email) {
      return res.status(400).json({ message: "Invalid" });
    }

    try {
      const user = orm.em.create(User, req.body);
      await orm.em.persist(user).flush();
      res.json(user);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  });

  app.use("/user", userRouter);
  app.use((_req: Request, res: Response) =>
    res.status(404).json({ message: "No route found" })
  );

  app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
  });
})();
