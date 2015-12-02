var path = require('path'),
	home = process.env.HOME || process.env.USERPROFILE,
	configPath = path.join(home, '.curryconfig'),
	config = null,
	fs = require('fs');

try {
	config = require(configPath);
}
catch (e) {
	config = {};
}

exports.getKey = function(key) {
	return config[key];
};

exports.updateKey = function(key, value) {
	config[key] = value;
	fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
};
