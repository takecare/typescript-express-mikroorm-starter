import dotenv from "dotenv";
import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

dotenv.config();

const config: Options = {
  entities: ["./dist/entities"],
  entitiesTs: ["./entities"],
  metadataProvider: TsMorphMetadataProvider,
  //   entities: [BaseEntity, User],
  type: "postgresql",
  clientUrl: process.env.PSQL_CONN,
  dbName: process.env.DB_NAME,
  cache: {
    enabled: true,
    pretty: process.env.NODE_ENV !== "production",
    options: { cacheDir: process.cwd() + "/mikroorm_cache" },
  },
  //   host: process.env.DB_HOST,
  //   port: Number.parseInt(process.env.DB_PORT!),
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  baseDir: process.cwd(),
  debug: process.env.NODE_ENV !== "production",
};

export default config;
