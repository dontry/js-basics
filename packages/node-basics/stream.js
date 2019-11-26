//the NodeJS application below is used to monitor url up/down status.

var request = require("request");
var stream = require("stream");
// transform stream to check the url status
var parallelUrlChecker = new stream.Transform({
  objectMode: true,
  transform: function(url, enc, done) {
    this.running++;
    var self = this;
    request.head("" + url, function(err, response) {
      self.push(url + " is " + (err ? "down" : "up") + "\n");
      self.running--;
      if (self.running === 0)
        self.terminateCallback && self.terminateCallback();
    });
    done();
  },
  flush: function(done) {
    if (this.running > 0) this.terminateCallback = done;
    else done();
  }
});
parallelUrlChecker.running = 0;
parallelUrlChecker.terminateCallback = null;
// array stream of urls
var arrayStream = new stream.Readable({
  read: function(size) {
    this.push(
      this.index < this.values.length ? this.values[this.index++] : null
    );
  }
});
arrayStream.values = [
  "http://site2.com",
  "http://site1.com",
  "http://site3.com"
];
arrayStream.index = 0;
arrayStream.pipe(parallelUrlChecker).pipe(process.stdout);
