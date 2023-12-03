import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import dotenv from "dotenv";

dotenv.config();

const config: Options = {
  baseDir: process.cwd(),
  entities: ["./dist/entities"],
  entitiesTs: ["./entities"],
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  clientUrl: process.env.PSQL_CONN,
  dbName: process.env.DB_NAME,
  cache: {
    enabled: true,
    pretty: process.env.NODE_ENV !== "production",
    options: { cacheDir: process.cwd() + "/mikroorm_cache" },
  },
  debug: process.env.NODE_ENV !== "production",
};

export default config;
