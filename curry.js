var arguments = process.argv;

var options = {
	'show': {
		file: 'core/show.js',
		description: 'Shows a list of the avalible curries.'
	},
	'add': {
		file: 'core/add.js',
		description: 'Adds a curry or other item to your current order.'
	},
	'status': {
		file: 'core/status.js',
		description: 'Retreives the status of your current order.'
	},
	'remove': {
		file: 'core/remove.js',
		description: 'Removes an item from your current order.'
	},
	'tag': {
		file: 'core/tag.js',
		description: 'Tag as a favorite.'
	},
	'modify': {
		file: 'core/modify.js',
		description: 'Edits the last order.'
	},
	'commit': {
		file: 'core/commit.js',
		description: ''
	},
	'blame': {
		file: 'core/blame.js',
		description: ''
	},
	'remote': {
		file: 'core/remote.js',
		description: ''
	},
	'config': {
		file: 'core/config.js',
		description: ''
	}
};

console.log(arguments);
