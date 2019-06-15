const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema( {
	title: {
		type: String,
		required: true
	},

	body: {
		type: String,
		required: true
	},

	comments: [{
		commentBody: {
			type: String,
			required: true
		},

		commentDate: {
			type: Date,
			default: Date.now
		},

		commentUser: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		}

	}],

	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},

	date: {
		type: Date,
		default: Date.now 	}
});


mongoose.model('topics', TopicSchema);

