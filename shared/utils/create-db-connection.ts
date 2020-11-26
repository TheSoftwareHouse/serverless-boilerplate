import dbConfig from "../config/db";
import { ConnectionOptions, createConnection } from "typeorm";

export default async () => createConnection(dbConfig as ConnectionOptions);
