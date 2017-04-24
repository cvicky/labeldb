'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
	label_name: 		{type: String}, 
	parent_company: {type: String} //look up enum to specify Sony, Warner, Universal, Independent, Unknown
});

module.exports = mongoose.model('Label', LabelSchema);