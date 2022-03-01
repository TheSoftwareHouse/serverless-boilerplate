import { Connection, ConnectionManager as TypeORMConnectionManager, getConnectionManager } from "typeorm";
import { winstonLogger } from "../logger";
import createDbConnection from "./create-db-connection";

export class ConnectionManager {
  private connectionManager: TypeORMConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = "default";

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      winstonLogger.info("Database.getConnection()-using existing connection ...");
      connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      winstonLogger.info("Database.getConnection()-creating connection ...");

      connection = await createDbConnection();
    }

    return connection;
  }
}
