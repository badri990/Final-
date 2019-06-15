const moment = require('moment');

module.exports = {
	stripTags: function(input) {
		return input.replace(/<(?:.|\n)*?>/gm,'');
	},

	formatDate: function(date, format) {
		return moment(date).format(format); 
	}

}