import { getReasonPhrase } from "http-status-codes";
import { AppError } from "./app.error";

export class HttpError extends AppError {
  public constructor(message: string, public status: number, parent?: Error | null) {
    super(message);

    const description = parent ? `${parent.constructor.name}: ${parent.message}` : message;
    const stack = process.env.STAGE === "staging" ? (parent ? parent.stack : this.stack) : undefined;

    const error = {
      statusCode: status,
      error: getReasonPhrase(status),
      description,
      stack,
    };

    this.message = JSON.stringify(error);

    this.statusCode = status;

    this.expose = true;

    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public statusCode: number;

  public expose: boolean;
}
