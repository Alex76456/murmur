const mongoose = require('mongoose');

const twitSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	text: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 140
	},
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 140
	},
	link: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 140
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			default: []
		}
	],
	comments: [
		{
			type: Object,
			//ref: 'comment',
			default: []
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('twit', twitSchema);
