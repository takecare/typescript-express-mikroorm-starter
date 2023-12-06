import { MikroORM } from "@mikro-orm/core";

interface DbSession {
  orm?: MikroORM;
}

export const session: DbSession = {};
