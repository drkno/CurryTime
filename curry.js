var command = require('./core/command.js');

var options = {
	'show': {
		file: './core/show.js',
		description: 'Shows a list of the avalible curries.'
	},
	'add': {
		file: './core/add.js',
		description: 'Adds a curry or other item to your current order.'
	},
	'modify': {
		file: './core/modify.js',
		description: 'Modifies the last order.'
	},
	'remove': {
		file: './core/remove.js',
		description: 'Removes an item from your current order.'
	},
	'order': {
		file: './core/order.js',
		description: 'Places your order on the set remote.'
	},
	'status': {
		file: './core/status.js',
		description: 'Retreives the status of your current order.'
	},
	'tag': {
		file: './core/tag.js',
		description: 'Tag as a favorite.'
	},
	'blame': {
		file: './core/blame.js',
		description: 'Blames all the people who ordered a particular item.'
	},
	'config': {
		file: './core/config.js',
		description: 'Configures curry-time.'
	}
};

command.run(options, process.argv, 0);
