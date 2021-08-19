const { Transform } = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const file = process.argv[2];

const progress = new Transform({
	transform(chunk, encoding, callback) {
		process.stdout.write('.');
		callback(null, chunk);
	}
}); // compose program

fs.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(crypto.createCipher('aes192', 'a_secret'))
	.pipe(progress)
	//.on('data', () => process.stdout.write('.'))
	.pipe(fs.createWriteStream(file + '.gz'))
	.on('finish', () => console.log('Done')) // combine event with pipe operator