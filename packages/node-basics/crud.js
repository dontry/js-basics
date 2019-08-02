const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const items = [];

const server = http.createServer(function(req, res) {
  console.log(`url`, url.parse(req.url));
  const uri = url.parse(req.url);

  if (uri.pathname.includes("/items")) {
    routeItem(req, res);
  }
  if (uri.pathname.includes("/files")) {
    routeFile(req, res);
  }
});

function routeItem(req, res) {
  switch (req.method) {
    case "POST":
      let item = "";
      req.setEncoding("utf8");
      req.on("data", function(chunk) {
        item += chunk;
      });
      req.on("end", function() {
        items.push(item);
        res.end("OK\n");
      });
      break;
    case "GET":
      const body = items
        .map(function(item, i) {
          return i + ") " + item + "\n";
        })
        .join("\n");
      res.setHeader("Content-Length", Buffer.byteLength(body));
      res.setHeader("Content-Type", "text/plain", (charset = "utf-8"));
      res.end(body);
      break;
    case "DELETE":
      const regex = /\/items\/(\d+)$/i;
      const path = url.parse(req.url).pathname;
      const match = regex.exec(path);
      const i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end("Invalid item id");
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end("Item not found");
      } else {
        items.splice(i, 1);
        res.end("OK\n");
      }
    default:
      break;
  }
}

const root = __dirname;

function routeFile(req, res) {
  const uri = url.parse(req.url);
  const regex = /\/files\/(\S+)$/i;
  const fileName = regex.exec(uri.pathname);

  const filePath = path.join(root, fileName[1]);
  console.log("file path:", filePath);
  fs.stat(filePath, function(err, stat) {
    if (err) {
      if ("ENOENT" === err.code) {
        res.statusCode = 404;
        res.end("Not found");
      } else {
        res.statusCode = 500;
        res.end("Internal server error");
      }
    } else {
      res.setHeader("Content-Length", stat.size);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on("error", function(err) {
        res.statusCode = 500;
        res.end("Internal server error");
      });
    }
  });
}

server.listen(3000, function() {
  console.log("Start server at port 3000");
});
