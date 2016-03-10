const mongoose = require('mongoose');

// Image Schema
const imageSchema = mongoose.Schema({
	url: {type: String, required: true},
	content: {type: String, required: true}
});

// Export
module.exports = mongoose.model('image', imageSchema);