var persistence = require('./persistence.js');

exports.run = function() {
	console.log("\n\
________            .___            \n\
\\_____  \\_______  __| _/___________ \n\
 /   |   \\_  __ \\/ __ |/ __ \\_  __ \\\n\
/    |    \\  | \\/ /_/ \\  ___/|  | \\/\n\
\\_______  /__|  \\____ |\\___  >__|   \n\
        \\/           \\/    \\/       \n\
");

	var location = persistence.getKey('location');
	if (!location) {
		location = 'away';
	}

	var currentOrder = persistence.getKey('stage');
	if (currentOrder && currentOrder.items.length > 0) {
		console.log('Current Unsubmitted Order');
		console.log('------------------------------------------------');
		console.log('Cost\t| Item');
		console.log('------------------------------------------------');

		var total = 0;
		for (var i = 0; i < currentOrder.items.length; i++) {
			total += currentOrder.items[i][location];
			var cost = '$' + currentOrder.items[i][location].toFixed(2);
			var name = currentOrder.items[i].name;
			console.log(cost + '\t| ' + name);
		}

		console.log('------------------------------------------------');
		console.log('Total\t| $' + total.toFixed(2));
		console.log('------------------------------------------------');
	}

};
