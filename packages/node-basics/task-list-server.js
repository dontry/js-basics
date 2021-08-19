const EventEmitter = require('events');

class Server extends EventEmitter {
	constructor(client) {
		super();
		this.tasks = {};
		this.taskId = 1;
		// ensure this is called after response listener is added
		process.nextTick(() => this.emit('response', 'Type a command (help to list commands)'));
		client.on('command', (command, args) => {
			switch (command) {
				case 'help':
				case 'add':
				case 'delete':
				case 'ls':
					this[command](args);
					break;
				default:
					this.emit('response', 'unknown command');
			}
		})
	}

	help() {
		this.emit('response', `Available commands: 
		add task
		ls
		delete: id`);
	}

	add(args) {
		this.tasks = {
			...this.tasks,
			[this.taskId]: args.join(' '),
		}
		this.emit('response', `Add task ${this.taskId}`)
		this.taskId++;
	}

	ls(args) {
		this.emit('response', `Tasks: ${JSON.stringify(this.tasks, null, 2)}`);
	}

	delete(args) {
		if (this.tasks[args[0]]) {
			delete this.tasks[args[0]];
			this.emit('response', `Delete task ${args[0]}`);
		} else {
			this.emit('response', `Task ${args[0]} not exist`);
		};
	}
};

module.exports = (client) => new Server(client)