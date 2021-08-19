const {Duplex, Transform} = require('stream');


const ioStream = new Duplex({
	write(chunk, encoding, cb) {
		console.log(chunk.toString());
		cb();
	},

	read(size) {
		if(this.currentCharCode > 90) {
			this.push(null); //signify no more data
			return;
		}
		this.push(String.fromCharCode(this.currentCharCode++));
	}
});

const transStream = new Transform({
	transform(chunk, encoding, cb) {
		this.push(chunk.toString().toUpperCase());
		cb();
	}
})

ioStream.currentCharCode = 65;

process.stdin.pipe(ioStream).pipe(process.stdout);
process.stdin.pipe(transStream).pipe(process.stdout);
