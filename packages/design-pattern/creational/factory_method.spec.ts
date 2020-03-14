import {
  LoanCreator,
  HomeLoanCreator,
  BusinessLoanCreator
} from "./factory_mehtod";

function logMessage(creator: LoanCreator): void {
  log("Show loan info");
  log(creator.log());
}

let log = (str: string) => {
  console.log(str);
};

describe("factory method", () => {
  beforeAll(() => {});

  afterAll(() => {});

  it("should show home loan info", () => {
    const homeLoanCreator = new HomeLoanCreator();
    log = jest.fn();
    logMessage(homeLoanCreator);
    expect(log).toBeCalledTimes(2);
    expect(log).toBeCalledWith(
      "Creator: The same creator's code has just worked with {HomeLoanProduct}"
    );
  });

  it("should show business loan info", () => {
    const businessLoanCreator = new BusinessLoanCreator();
    log = jest.fn();
    logMessage(businessLoanCreator);
    expect(log).toBeCalledTimes(2);
    expect(log).toBeCalledWith(
      "Creator: The same creator's code has just worked with {BusinessLoanProduct}"
    );
  });
});
