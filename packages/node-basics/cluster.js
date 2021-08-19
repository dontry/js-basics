const cluster = require('cluster');
const os = require('os');

const numberOfUsersInDB = () => {
	this.count = this.count || 5;
	this.count = this.count * this.count;
	return this.count
}

if (cluster.isMaster) {
	const cpus = os.cpus().length;

	console.log(`forking for ${cpus} CPUs`);

	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}

	console.dir(cluster.workers, { depth: 0 });
	// Object.values(cluster.workers).forEach(worker => {
	// worker.send(`Hello Worker ${worker.id}`);
	// });
	const updateWorkers = () => {
		const usersCount = numberOfUsersInDB();
		Object.values(cluster.workers).forEach(worker => {
			worker.send({ usersCount });
		});
	}
	updateWorkers();
	setInterval(updateWorkers, 10000);

	cluster.on('exit', (worker, code,signal) => {
		if(code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(`Worker ${worker.id} crashed.\nStarting na new worker...`)
			cluster.fork();
		}
	});
} else {
	require('./server')
}