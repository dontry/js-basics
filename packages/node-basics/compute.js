const longCompute = () => {
	let sum = 0;
	for (let index = 0; index < 1e9; index++) {
		sum += index;
	}
	return sum;
}

process.on('message', msg => {
	const sum = longCompute();
	process.send(sum);
})