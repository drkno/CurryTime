var readlineSync = require('readline-sync'),
	persistence = require('./persistence.js'),
	strength = require('./strength.js'),
	items = require('./curries.json');

var find = function (curry) {
	if (!curry) return curry;
	var name = curry.toLowerCase(),
		i = items.items.find(function(element, index, array) {
			return element.name.toLowerCase() === name;
		});
	return i;
};

var lunchSpecial = function() {
	var currentOrder = persistence.getKey('stage'),
		curry = false,
		naan = false,
		drink = false,
		pappadam = false,
		rice = false,
		total = 13;
	for (var i = 0; i < currentOrder.items.length; i++) {
		if (!curry && currentOrder.items[i].type.indexOf('Curry') >= 0 && currentOrder.items[i].ls === 1 && !currentOrder.items[i].special) {
			curry = currentOrder.items[i];
			console.log('Assuming already added "' + currentOrder.items[i].name.cyan + '" is the curry.');
		}

		if (!naan && currentOrder.items[i].type.indexOf('Bread') >= 0 && currentOrder.items[i].ls === 1 && !currentOrder.items[i].special) {
			naan = currentOrder.items[i];
			console.log('Assuming already added "' + currentOrder.items[i].name.cyan + '" is the naan.');
		}

		if (!drink && currentOrder.items[i].type.indexOf('Drink') >= 0 && currentOrder.items[i].ls === 1 && !currentOrder.items[i].special) {
			drink = currentOrder.items[i];
			console.log('Assuming already added "' + currentOrder.items[i].name.cyan + '" is the drink.');
		}

		if (!pappadam && currentOrder.items[i].type.indexOf('Side') >= 0 && currentOrder.items[i].ls === 1 && !currentOrder.items[i].special) {
			pappadam = currentOrder.items[i];
			console.log('Assuming already added "' + currentOrder.items[i].name.cyan + '" is the pappadam.');
		}

		if (!rice && currentOrder.items[i].type.indexOf('Rice') >= 0 && currentOrder.items[i].ls === 1 && !currentOrder.items[i].special) {
			rice = currentOrder.items[i];
			console.log('Assuming already added "' + currentOrder.items[i].name.cyan + '" is the rice.');
		}
	}

	if (!curry) {
		curry = find(readlineSync.question('What curry do you want? ').trim());
		if (!curry || curry.ls !== 1 || curry.type.indexOf('Curry') < 0) {
			console.log(figlet.textSync('WHAT?', 'Graffiti').red);
			console.log("That curry isn't in the special or I've never heard of it before!");
			process.exit(-3);
		}
		var stren = readlineSync.question('How strong should the curry be?');
		curry.strength = strength.run(stren);
		currentOrder.items.push(curry);
	}

	if (!naan) {
		var t = readlineSync.question('Plain or butter naan? ').trim().toLowerCase();
		switch(t) {
			case 'plain': {
				naan = find("Plain Naan");
				break;
			}
			case 'butter': {
				naan = find("Butter Naan");
				break;
			}
			default: {
				console.log(figlet.textSync('Can you even?', 'Crawford2').red);
				console.log("I asked for 'plain' or 'butter'. You gave me '" + t + "'!");
				process.exit(-3);
				break;
			}
		}
		currentOrder.items.push(naan);
	}

	if (!drink) {
		console.log('What drink do you want?')
		drink = find(readlineSync.question('Soft Drink Name or Mango Lassi (+$1): ').trim());
		if (!drink || drink.ls !== 1 || drink.type.indexOf('Drink') < 0) {
			console.log(figlet.textSync('WHAT?', 'Graffiti').red);
			console.log("That drink isn't in the special or I've never heard of it before!");
			process.exit(-3);
		}
		currentOrder.items.push(drink);
	}

	if (!pappadam) {
		pappadam = find("Papadoms");
		currentOrder.items.push(pappadam);
	}

	if (!rice) {
		rice = find("Basmati Rice");
		currentOrder.items.push(rice);
	}

	if (!currentOrder.specials) {
		currentOrder.specials = {last:-1};
	}

	if (drink.name === "Mango Lassi") {
		total++;
	}

	currentOrder.specials.last++;

	curry.special = currentOrder.specials.last;
	naan.special = currentOrder.specials.last;
	drink.special = currentOrder.specials.last;
	pappadam.special = currentOrder.specials.last;
	rice.special = currentOrder.specials.last;

	currentOrder.specials[currentOrder.specials.last] = {
		name: 'Lunch Special',
		cost: total
	};

	currentOrder.date = new Date();
	persistence.updateKey('stage', currentOrder);
};

var summerSpecial = function() {

};

exports.run = function(special) {
	switch(special) {
		case 'lunch': {
			lunchSpecial();
			break;
		}
		case 'summer': {
			summerSpecial();
			break;
		}
	}
};
