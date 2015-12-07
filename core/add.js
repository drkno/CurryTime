var commands = require('./command.js'),
	persistence = require('./persistence.js'),
	specials = require('./specials.js'),
	items = require('./curries.json'),
	mode = -1,
	options = {
		'item': {
			description: 'Adds an item to your order.',
			method: function() {
				mode = 0;
			}
		},
		'special': {
			description: 'Adds a special to your order.',
			method: function() {

			}
		}
	},

help = function() {
console.log("\n\
   \\ \n\
   .\\\"\"\"\"\"\"\"\"\"-.\n\
   \\`\\-------'`/\n\
    \\ \\__ o . /\n\
     \\/  \\  o/\n\
      \\__/. /\n\
       \\_ _/\n\
         Y\n\
         |\n\
         |\n\
     _.-' '-._\n\
    `---------`\n\
");
	console.log('Coming Soon: ability to predict orders and translate jibberish.');
	console.log('In the mean time please just tell us what you want.');
	process.exit(-2);
},

verify = function (curry) {
	if (!curry) return curry;
	var name = curry.toLowerCase(),
		i = items.items.find(function(element, index, array) {
			return element.name.toLowerCase() === name;
		});
	return i;
};

exports.run = function() {
	commands.run(options, process.argv, 1);
	process.argv.splice(0, 4);
	var item = process.argv.join(' ');
	if (item.length > 0 && !item.trim()) {
		help();
	}
	item = item.trim();

	var stage = persistence.getKey('stage');
	if (!stage) {
		stage = {
			date: new Date(),
			items: []
		};
	}

	switch (mode) {
		case 0: {
			var add = verify(item);
			if (!add) help();
			stage.items.push(add);
			break;
		}
		default: help(); break;
	}

	persistence.updateKey('stage', stage);
};
