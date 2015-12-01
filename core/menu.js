var request = require('request');

exports.getMenu = function(callback) {
  request('http://www.pepperbridge.co.nz/menu.html', function(error, response, body) {
    if (error) {
      throw error;
    }

	console.log(body);

    var menuSections = [];
    var menuSectionsRe = /<article class=\"row my_row\">.+<\/article>/gm;
    var match;
    while (match = menuSectionsRe.exec(body)) {
      console.log(match[1], match[2]);
    }
  });
};
