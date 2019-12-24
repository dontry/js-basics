const fs = require("fs");

function someAsyncOperation(callback) {
  // read a file
  fs.readFile("./hook.js", callback);
  new Promise(resolve => {
    resolve();
  }).then(() => {
    console.log("promise");
    process.nextTick(() => {
      console.log("next tick2");
    });
  });
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms before calling the setTimeout callback`);
}, 5);

process.nextTick(() => {
  console.log("next tick");
});

// execute a call back
someAsyncOperation(() => {
  const startCallback = Date.now();

  // 执行一个耗时 10 毫秒的同步操作
  while (Date.now() - startCallback < 10) {
    // 什么也不做
  }
  new Promise(resolve => {
    resolve();
  }).then(() => {
    console.log("promise callback");
  });
});

const EventEmitter = require("events");
const util = require("util");

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit("event");
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});

setTimeout(_ => console.log(4));

async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(3);
}

main();

console.log(2);
