const _ = require("lodash");

function lameCSV(str) {
  return str.split("\n").reduce((table, row) => {
    table.push(row.split(",").map(c => c.trim()));
    return table;
  }, []);
}

function selectNames(table) {
  return _.tail(table.map(_.head));
}

function selectAges(table) {
  return _.tail(table.map(col => col[1]));
}

// const table = lameCSV("name,age,hair\nalice,35,red\nbob,64,blonde");

// const names = selectNames(table);
// const ages = selectAges(table);
// ages;

module.exports = {
  lameCSV,
  selectNames,
  selectAges
};
