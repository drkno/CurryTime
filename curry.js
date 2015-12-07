var commands = require('./core/command.js'),
	prototypes = require('./core/prototypes.js');

var options = {
	'show': {
		file: './show.js',
		description: 'Shows a list of the avalible curries.'
	},
	'add': {
		file: './add.js',
		description: 'Adds a curry or other item to your current order.'
	},
	'modify': {
		file: './modify.js',
		description: 'Modifies the last order.'
	},
	'remove': {
		file: './remove.js',
		description: 'Removes an item from your current order.'
	},
	'order': {
		file: './order.js',
		description: 'Places your order on the set remote.'
	},
	'status': {
		file: './status.js',
		description: 'Retreives the status of your current order.'
	},
	'tag': {
		file: './tag.js',
		description: 'Tag as a favorite.'
	},
	'blame': {
		file: './blame.js',
		description: 'Blames all the people who ordered a particular item.'
	},
	'config': {
		file: './config.js',
		description: 'Configures curry-time.'
	}
};

var command = commands.run(options, process.argv, 0);
command.run();
