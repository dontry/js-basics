const fs = require('fs');
const server =require('http').createServer();

server.on('request', (req, res) => {
	const src = fs.createReadStream('./package-lock.json');
	src.pipe(res);
})

server.listen(8000);