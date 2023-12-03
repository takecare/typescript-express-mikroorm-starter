import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = {
  baseDir: process.cwd(),
  entities: ["./dist/entities"],
  entitiesTs: ["./entities"],
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT!),
  dbName: process.env.DB_NAME,
  cache: {
    enabled: true,
    pretty: process.env.NODE_ENV !== "production",
    options: { cacheDir: process.cwd() + "/mikroorm_cache" },
  },
  debug: process.env.NODE_ENV !== "production",
};

export default config;
