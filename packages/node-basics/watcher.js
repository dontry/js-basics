const fs = require('fs');
const events = require('events');
const utils = require('util');
const path = require('path');
console.log(__dirname);
const watchDir = path.resolve(__dirname, './watch');
const processedDir = path.resolve(__dirname, './done');

// utils.inherits(Watcher, events.EventEmitter);

// function Watcher(watchDir, processedDir) {
//   this.watchDir = watchDir;
//   this.processedDir = processedDir;
// }
class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  watch() {
    let watcher = this;
    fs.readdir(this.watchDir, function(err, files) {
      if (err) throw err;
      for (let index in files) {
        watcher.emit('process', files[index]);
      }
    });
  }

  start() {
    let watcher = this;
    fs.watchFile(this.watchDir, function() {
      watcher.watch();
    });
  }
}

const watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function(file) {
  const watchFile = this.watchDir + '/' + file;
  const processedFile = this.processedDir + '/' + file.toLowerCase();
  fs.rename(watchFile, processedFile, function(err) {
    if (err) throw err;
  });
});

watcher.start();
