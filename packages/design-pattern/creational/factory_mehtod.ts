interface LoanProduct {
  displayInfo(): string;
}

export abstract class LoanCreator {
  constructor() {}

  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract create(): LoanProduct;

  public log(): string {
    const product = this.create();
    return `Creator: The same creator's code has just worked with ${product.displayInfo()}`;
  }
}

export class HomeLoanCreator extends LoanCreator {
  /**
   * factoryMethod
   */
  public create(): LoanProduct {
    return new HomeLoanProduct();
  }
}

export class BusinessLoanCreator extends LoanCreator {
  /**
   * factoryMethod
   */
  public create(): LoanProduct {
    return new BusinessLoanProduct();
  }
}

export class HomeLoanProduct implements LoanProduct {
  public displayInfo() {
    return `{HomeLoanProduct}`;
  }
}

export class BusinessLoanProduct implements LoanProduct {
  public displayInfo() {
    return `{BusinessLoanProduct}`;
  }
}
