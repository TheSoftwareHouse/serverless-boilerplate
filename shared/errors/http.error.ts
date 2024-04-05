import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { AppError } from "./app.error";

export class HttpError extends AppError {
  public constructor(
    public status: number,
    message?: string,
    parent?: Error | null,
  ) {
    super(message);

    const description = parent ? `${parent.constructor.name}: ${parent.message}` : message;
    // eslint-disable-next-line no-nested-ternary
    const stack = process.env.STAGE === "staging" ? (parent ? parent.stack : this.stack) : undefined;

    let error = {};

    if (status === StatusCodes.BAD_REQUEST) {
      error = { errors: description, stack };
    } else {
      error = {
        code: `error.${getReasonPhrase(status).toLowerCase().split(" ").join(".")}`,
        message: description,
        stack,
      };
    }

    this.message = JSON.stringify(error);

    this.statusCode = status;

    this.expose = true;

    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public statusCode: number;

  public expose: boolean;
}
