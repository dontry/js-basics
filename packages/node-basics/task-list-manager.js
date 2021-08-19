const EventEmitter = require('events'); // import
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const client = new EventEmitter();
const server = require('./task-list-server')(client);

server.on('response', res => {
	process.stdout.write(`\u001B[2J\u001B[0;0f`); //clear console
	process.stdout.write(res);
	process.stdout.write('\n\> ');
})

rl.on('line', (input) => {
	let [command, ...args] = input.split(' ');
	console.log({command, args});
	client.emit('command', command, args);
});