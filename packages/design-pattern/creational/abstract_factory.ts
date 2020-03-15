// Product
export abstract class Account {
  constructor(
    protected name: string,
    protected amount: number = 0,
    protected description: string = ""
  ) {}
  public abstract setName(name: string): void;
  public abstract setAmount(amount: number): void;
  public abstract setDescription(description: string): void;
  public abstract getName(): string;
  public abstract getAmount(): number;
  public abstract getDescription(): string;
}

export class OffsetAccount extends Account {
  constructor(
    protected name: string,
    protected amount: number,
    protected description: string
  ) {
    super(name, amount, description);
  }
  public setName(name: string): void {
    this.name = name;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getName(): string {
    throw new Error("Method not implemented.");
  }
  public getAmount(): number {
    throw new Error("Method not implemented.");
  }

  public getDescription(): string {
    throw new Error("Method not implemented.");
  }
}

export class DepositAccount extends Account {
  constructor(
    protected name: string,
    protected amount: number,
    protected description: string
  ) {
    super(name, amount, description);
  }
  public setName(name: string): void {
    this.name = name;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getName(): string {
    throw new Error("Method not implemented.");
  }
  public getAmount(): number {
    throw new Error("Method not implemented.");
  }

  public getDescription(): string {
    throw new Error("Method not implemented.");
  }
}

//  Card
export interface Card {
  deposit(amount: number): void;
  transfer(): void;
  withdraw(amount: number): number;
}

export class DebitCard implements Card {
  deposit(amount: number): void {
    throw new Error("Method not implemented.");
  }
  transfer(): void {
    throw new Error("Method not implemented.");
  }
  withdraw(amount: number): number {
    throw new Error("Method not implemented.");
  }
}

export class CreditCard implements Card {
  deposit(amount: number): void {
    throw new Error("Method not implemented.");
  }
  transfer(): void {
    throw new Error("Method not implemented.");
  }
  withdraw(amount: number): number {
    throw new Error("Method not implemented.");
  }
}

// Factory
export interface AccountCreator {
  createAccount(name: string, amount: number, description?: string): Account;
  createCard(name: string, cardNumber: number): Card;
}

export class OffsetAccountCreator implements AccountCreator {
  public createAccount(
    name: string,
    amount: number,
    description: string
  ): Account {
    return new OffsetAccount(name, amount, description);
  }
  public createCard(): Card {
    return new CreditCard();
  }
}

export class DepositAccountCreator implements AccountCreator {
  public createAccount(
    name: string,
    amount: number,
    description: string
  ): Account {
    return new DepositAccount(name, amount, description);
  }
  public createCard(): Card {
    return new DebitCard();
  }
}
