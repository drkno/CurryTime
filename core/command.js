var argvInc = 2,

banner = function() {
console.log("\
   ____                   _______ _                \n\
 / ____|                 |__   __(_)               \n\
| |    _   _ _ __ _ __ _   _| |   _ _ __ ___   ___ \n\
| |   | | | | '__| '__| | | | |  | | '_ ` _ \\ / _ \\\n\
| |___| |_| | |  | |  | |_| | |  | | | | | | |  __/\n\
 \\_____\\__,_|_|  |_|   \\__, |_|  |_|_| |_| |_|\\___|\n\
                        __/ |                      \n\
                       |___/                       \n\
".red);
},

help = function(options, arg) {
	banner();

	if (!arg) {
		console.log('An option must be specified.'.bold);
	}
	else {
		console.log('"' + arg.bold + '" is not a valid option.');
	}

	console.log("Avalible arguments are:");
	for (var option in options) {
		console.log('\t' + option + '\t\t' + options[option].description);
	}

	console.log('\nAnother exceptionally useless creation by Matthew Knox and Dion Woolley.');

	process.exit(-1);
};

exports.run = function (options, arguments, index) {
	var arg = arguments[argvInc + index];
	if (!arg || !options[arg]) {
		return help(options, arg);
	}

	if (options[arg].file) {
		return require(options[arg].file);
	}
	else if (options[arg].method) {
		return options[arg].method();
	}
	else {
		throw 'Unknown run type.';
	}
};
