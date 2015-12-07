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
		var sp = '';
		if (!isNaN(stage.items[i].special)) {
			sp = '[' + stage.specials[stage.items[i].special].name + '] ';
		}
		console.log('-\t' + sp.yellow + stage.items[i].name);
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
},

removeSpecial = function(stage, special) {
	console.log('NOTE'.yellow + ': By removing this item you have removed the special "' + stage.specials[special].name.cyan + '"');
	for (var i = 0; i < stage.items.length; i++) {
		if (stage.items[i].special === special) {
			delete stage.items[i].special;
		}
	}
	delete stage.specials[special];
	if (Object.keys(stage.specials).length === 1) {
		delete stage.specials;
	}
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

	if (!isNaN(stage.items[remove].special)){
		removeSpecial(stage, stage.items[remove].special);
	}

	stage.items.splice(remove, 1);
	persistence.updateKey('stage', stage);
	console.log(item + ' removed.');
};
