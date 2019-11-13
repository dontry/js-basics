// file.txt contains 0123456789
var fs = require("fs");
fs.open("./file.txt", "r", function(err, fd) {
  var asyncBuffer = new Buffer(5);
  fs.read(fd, asyncBuffer, 0, asyncBuffer.length, null, function(
    err,
    bytesRead,
    data
  ) {
    if (err) {
      return console.error(err);
    }
    console.log(
      "asynchronous file read (" +
        bytesRead +
        "): " +
        asyncBuffer.toString("utf8", 0, bytesRead)
    );
  });

  var syncBuffer = new Buffer(5);
  var bytesRead = fs.readSync(fd, syncBuffer, 0, syncBuffer.length, null);
  console.log(
    "synchronous file read (" +
      bytesRead +
      "): " +
      syncBuffer.toString("utf8", 0, bytesRead)
  );
});
