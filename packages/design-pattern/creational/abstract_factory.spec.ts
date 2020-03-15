import {
  AccountCreator,
  OffsetAccountCreator,
  CreditCard,
  OffsetAccount
} from "./abstract_factory";

function clientCode(
  creator: AccountCreator,
  name: string,
  amount: number,
  description: string,
  cardNumber: number
) {
  creator.createAccount(name, amount, description);
  creator.createCard(name, cardNumber);
}

describe("Abstract factory", () => {
  it("should create OffsetAccount and CreditCard when create a OffsetAccount", () => {
    const creator: OffsetAccountCreator = new OffsetAccountCreator();
    creator.createAccount = jest.fn();
    creator.createCard = jest.fn();

    clientCode(creator, "John", 100, "new account", 1000320);
    expect(creator.createAccount).toBeCalledTimes(1);
    expect(creator.createCard).toBeCalledTimes(1);
  });
});
