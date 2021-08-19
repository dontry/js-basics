const http = require('http');
const pid = process.pid;

let usersCount;

http.createServer((req, res) => {
	for (let index = 0; index < 1e7; index++) {
	}
	res.write(`Handled by process ${pid}\n`);
	res.end(`Users: ${usersCount}`);
}).listen(8080, () => {
	console.log(`Started process ${pid}`);
})

process.on('message', msg => {
	console.log(`Message from master: ${msg}`);
	usersCount = msg.usersCount;
})