export interface Subject {
  request(payload: Payload): void;
}

export interface Payload {
  msg: string;
  permisison: boolean;
}

export class RealSubject implements Subject {
  public request(payload: Payload): void {
    console.log(`Real subject request: ${payload.msg}`);
  }
}

export class ProxySubject implements Subject {
  private realSubject: RealSubject | undefined = undefined;

  // Lazy initialization
  public request(payload: Payload): void {
    if (this.realSubject == null) {
      this.realSubject = new RealSubject();
    }
    console.log("Proxy request");
    if (this.checkPermission(payload.permisison)) {
      this.realSubject.request(payload);
    } else {
      console.log("Access Denied");
    }
  }

  // Access control
  public checkPermission(permitted: boolean): boolean {
    return permitted;
  }
}
