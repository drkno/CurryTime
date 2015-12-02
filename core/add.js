var commands = require('./command.js'),
	persistence = require('./persistence.js'),
	mode = -1,
	options = {
		'curry': {
			description: 'Adds a curry to your order.',
			method: function() {
				mode = 0;
			}
		},
		'drink': {
			description: 'Adds a drink to your order.',
			method: function() {
				mode = 1;
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

verifyCurry = function (curry) {
	return false;
},

verifyDrink = function (drink) {
	return true;
};

exports.run = function() {
	commands.run(options, process.argv, 1);
	var item = process.argv[4];
	switch (mode) {
		case 0: if (!verifyCurry(item)) help(); break;
		case 1: if (!verifyDrink(item)) help(); break;
		default: help(); break;
	}

	var stage = persistence.getKey('stage');
	if (!stage) {
		stage = {
			date: new Date(),
			items: []
		};
	}

	stage.items.push(item);
	persistence.updateKey('stage', stage);
};
