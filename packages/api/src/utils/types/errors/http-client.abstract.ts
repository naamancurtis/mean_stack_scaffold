abstract class HTTPClientError extends Error {
  readonly statusCode!: number;

  readonly name!: string;

  protected constructor(message: object | string) {
    if (typeof message === 'string') {
      super(message);
    } else {
      super(JSON.stringify(message));
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HTTPClientError;
