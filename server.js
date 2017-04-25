'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //how to communnicate with the front end that's on a diff domain
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbURI = "mongodb://cvicky:password@ds163340.mlab.com:63340/test-labeldb";
const mongooseURI = uriUtil.formatMongoose(mongodbURI); //mongoose can now undersatnt the MongodbURI
const dbOptions = {}; //the mongoose connection will expect some options but if non, them leace empty

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//set up the routes
app.use('/api/labels', require('./api/labels/routes'));


const hostname = 'localhost';
const port = 3003; //this API is served from localhost 3003

app.listen(port, hostname, () => {
	mongoose.connect(mongooseURI, dbOptions, (err) => {
		if(err){
			console.log(err);
		}
		console.log(`Server is running at http://${hostname}:${port}`);
	}); //mongoose connected
});