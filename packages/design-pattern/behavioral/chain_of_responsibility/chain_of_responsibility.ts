export interface Request {
  permission: boolean;
  message: string;
}

export abstract class Middleware {
  protected next: Middleware | undefined;
  public handle(request: Request): void {
    this.next?.handle(request);
  }
  public setNext(handler: Middleware): void {
    this.next = handler;
  }
}

export class AccessControlHandler extends Middleware {
  handle(request: Request): void {
    if (request.permission === true) {
      super.handle(request);
    } else {
      console.log("Sorry, access denied.");
    }
  }
}

export class LogHandler extends Middleware {
  handle(request: Request) {
    console.log(`Log request: ${request.message}`);
    super.handle(request);
  }
}

export class ParserHandler extends Middleware {
  handle(request: Request) {
    console.log(`Parser: ${JSON.stringify(request, null, 2)}`);
    super.handle(request);
  }
}

export class Server {
  private firstHandler: AccessControlHandler;
  constructor() {
    this.firstHandler = new AccessControlHandler();
    const logHandler = new LogHandler();
    const parserHandler = new ParserHandler();
    this.firstHandler.setNext(logHandler);
    logHandler.setNext(parserHandler);
  }
  public handleRequest(request: Request): void {
    this.firstHandler.handle(request);
  }
}
