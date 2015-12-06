var commands = require('./command.js'),
	persistence = require('./persistence.js'),
	options = {
		'remote': {
			description: 'Gets or sets the remote provider of your curry.',
			method: function() {
				if (process.argv.length > 5) {
					help();
				}
				return ['remote', process.argv[4]];
			}
		},
		'name': {
			description: 'Gets or sets your name.',
			method: function() {
				process.argv.splice(0, 4);
				var name = process.argv.join(' ');
				if (name.length > 0 && !name.trim()) {
					help();
				}
				return ['name', name.trim()];
			}
		}
	},

help = function() {

console.log('\
▄██████████████▄▐█▄▄▄▄█▌\n\
██████▌▄▌▄▐▐▌███▌▀▀██▀▀\n\
████▄█▌▄▌▄▐▐▌▀███▄▄█▌\n\
▄▄▄▄▄██████████████▀\n\
');
	console.log('What are you even trying to do?');
	process.exit(-2);
};

exports.run = function() {
	var result = commands.run(options, process.argv, 1);
	if (!result[1]) {
		console.log(persistence.getKey(result[0]));
	}
	else {
		persistence.updateKey.apply(this, result);
		console.log(result[0] + ' updated to \"' + result[1] + '".');
	}
};
