import dbConfig from "../config/db.config";
import { ConnectionOptions, createConnection } from "typeorm";

export default async () => createConnection(dbConfig as ConnectionOptions);
