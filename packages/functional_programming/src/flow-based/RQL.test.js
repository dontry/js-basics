const pipeline = require("./pipeline");
const RQL = require("./RQL");

const library = [
  {
    title: "Great Expectation",
    author: "Anon",
    edition: 1
  },
  {
    title: "The great Gatsby",
    author: "Fitz Gerald",
    edition: 2
  }
];

describe("RQL", () => {
  it("should return one book", () => {
    function allFirstEditions(table) {
      return pipeline(
        table,
        RQL.select(["title", "edition", "author"]),
        RQL.where(book => {
          return book.edition === 1;
        })
      );
    }

    expect(allFirstEditions(library).length).toEqual(1);
  });
});
