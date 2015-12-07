var persistence = require('./persistence.js');

exports.run = function() {
	var stage = persistence.getKey('stage');
	if (!stage) {
		stage = {
			date: new Date(),
			items: []
		};
	}
	stage.items = [];
	persistence.updateKey('stage', stage);
	console.log('Current unsubmitted order reset successfully.');
};
