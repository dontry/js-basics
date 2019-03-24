const fp = require("lodash/fp");
const _ = require("lodash");
const axios = require("axios");

const trace = _.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const Impure = {
  getJSON: _.curry((callback, url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          callback(response.data);
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  })
};

const url = username => `https://www.reddit.com/user/${username}/about/.json`;

const app = fp.compose([Impure.getJSON(trace("response")), url]);

module.exports = {
  app
};
