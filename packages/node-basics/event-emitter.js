const EventEmitter = require('events'); // import
const fs = require('fs');

// synchronous
class WithLog extends EventEmitter { // extend
	execute(taskFunc) {
		console.log('Before executing');
		this.emit('begin');
		taskFunc();
		this.emit('end');
		console.log('After executing');
	}
}

const logger = new WithLog(); // init

logger.on('begin', () => console.log('About to execute')) // addListener;
logger.on('end', () => console.log('Done with execute\n\n\n')) // addListener;

logger.execute(() => console.log('*** Executing task ***'))


// asynchronous
class WithTime extends EventEmitter { // extend
	execute(asyncFunc, ...args) {
		console.time('execute');
		console.log(args);
		this.emit('begin');
		asyncFunc(...args, (err, data) => {
			if (err) {
				return this.emit('error', err);
			}

			this.emit('data', data);
			console.timeEnd('execute');
			this.emit('end')
		});
	}
}

const withTime = new WithTime(); // init

withTime.on('begin', () => console.log('About to execute')) // addListener;
withTime.on('end', () => console.log('Done with execute')) // addListener;
withTime.on('data', (data) => {
	console.log(`Length: ${data.length}`);
});

withTime.once('uncaughtException', (err) => { // generic exception handler;
	console.log('xxx');
	console.log(err);
	// do some cleanup
	process.exit(1); // exit anyway
	// alternative
});

withTime.on('error', console.error);


withTime.prependListener('data', (data) => { // add to the first of listener list
	console.log(`Characters: ${data.toString().length}`);
})


withTime.execute(fs.readFile, __filename);
withTime.execute(fs.readFile, ''); //error