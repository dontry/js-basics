export interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

export interface Aggregator {
  getIterator(): Iterator<string>;
}

export class AlphabeticalOrderIterator implements Iterator<string> {
  private position: number = 0;

  constructor(
    private collection: WordCollection,
    private reverse: boolean = false
  ) {
    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }
  current(): string {
    return this.collection.getItems()[this.position];
  }
  next(): string {
    this.position += 1;
    return this.collection.getItems()[this.position];
  }
  key(): number {
    return this.position;
  }
  valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    } else {
      return this.position < this.collection.getCount();
    }
  }
  rewind(): void {
    throw new Error("Method not implemented.");
  }
}

export class WordCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount() {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  getIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  getReverseIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}
