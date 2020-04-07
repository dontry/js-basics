export class DomManager {
  constructor() {}
}

export interface Subject {
  subscribe(eventType: string, observer: Observer): void;
  unsubscribe(eventType: string): void;
  notify(eventType: string, data: string): void;
}

export interface Observer {
  handle(data: string): void;
}

export class EventSubject implements Subject {
  private eventListeners: Map<string, Observer> = new Map<string, Observer>();
  constructor() {}

  public subscribe(eventType: string, observer: Observer): void {
    if (this.eventListeners.has(eventType)) {
      console.log("observer has been subscribed already.");
    } else {
      this.eventListeners.set(eventType, observer);
    }
  }

  public unsubscribe(eventType: string): void {
    this.eventListeners.delete(eventType);
  }

  public notify(eventType: string, data: string) {
    this.eventListeners.get(eventType)?.handle(data);
  }
}

export class LogObserver implements Observer {
  handle(data: string): void {
    console.log(`Log data: ${data}`);
  }
}

export class EventHandler implements Observer {
  handle(data: string): void {}
}
