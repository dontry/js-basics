const plucker = require("./plucker");
const { filter } = require("../curry");

const book = { title: "Infinite Jest", author: "DFW" };
const getTitle = plucker("title");

it("should get the book title", () => {
  const title = getTitle(book);
  expect(title).toEqual(book.title);
});

const books = [
  { title: "Infinite Jest" },
  { author: "Fitz Gerald" },
  { title: "Botcham" }
];

it("should get the book title", () => {
  const titles = filter(getTitle, books);
  expect(titles).toEqual([{ title: "Infinite Jest" }, { title: "Botcham" }]);
});
