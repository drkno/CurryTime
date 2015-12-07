var commands = require('./command.js'),
	persistence = require('./persistence.js'),

help = function() {
console.log("\n\
     (      )\n\
     ))    ((\n\
    //      \\\\\n\
   | \\\\____// |\n\
  \\~/ ~    ~\\/~~/\n\
   (|    _/o  ~~\n\
    /  /     ,|\n\
   (~~~)__.-\\ |\n\
    ``~~    | |\n\
     |      | |\n\
     |        |\n\
    /          \\\n\
   `\\          /'\n\
     `\\_    _/'\n\
        ~~~~\n\
");
	console.log('I have no idea what item you wanted me to remove from your order but here is a deer.');
	console.log('The avalible items are:');

	var stage = persistence.getKey('stage');
	for (var i = 0; i < stage.items.length; i++) {
		console.log('-\t' + stage.items[i].name);
	}

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
	process.argv.splice(0, 3);
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
	stage.date = new Date();

	var remove = -1;
	var name = item.toLowerCase();
	for (var i = 0; i < stage.items.length; i++) {
		if (stage.items[i].name.toLowerCase() === name) {
			remove = i;
		}
	}
	if (remove === -1) {
		help();
	}

	stage.items.splice(remove, 1);
	persistence.updateKey('stage', stage);
	console.log(item + ' removed.');
};
