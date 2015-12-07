exports.run = function(strength) {
	if (!strength) {
		console.log('Assuming strength of curry is "' + 'crappy'.green + '" (mild).');
		console.log('Next time try passing in a ' + 'weakling'.yellow + ' or ' + 'burn'.red + ' option for some more fire.');
		return 'Mild';
	}

	strength = strength.trim().toLowerCase();

	switch (strength) {
		case 'mild':
		case 'weak':
		case 'crappy': {
			return 'Mild';
			break;
		}
		case 'med':
		case 'medium':
		case 'weakling': {
			return 'Medium';
			break;
		}
		case 'hot':
		case 'burn':
		case 'fire':
		case 'manly': {
			console.log(figlet.textSync('Challenge', 'Crawford2').red);
			console.log(figlet.textSync('Accepted!', 'Crawford2').red);
			return 'Hot';
			break;
		}
		default: {
			console.log(figlet.textSync('Can you even?', 'Crawford2').red);
			console.log("I asked for 'mild', 'medium' or 'hot'. You gave me '" + strength.cyan + "'!");
			process.exit(-3);
			break;
		}
	}
};

exports.extract = function(input) {
	var keywords = ['mild', 'weak', 'crappy', 'med', 'medium', 'weakling', 'hot', 'burn', 'fire', 'manly'];
	var spl = input.split(' ');

	for (var i = 0; i < spl.length; i++) {
		var t = spl[i].trim().toLowerCase();
		if (keywords.includes(t)) {
			var ind = input.toLowerCase().indexOf(t);
			input = input.substring(0, ind) + input.substring(ind + t.length);
			return [input.trim(), t];
		}
	}
	return [input];
};
