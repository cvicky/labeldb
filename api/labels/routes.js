'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Label = require('./model/Label');
const router = express.Router();

//POST request
router.route('/') 
	.post((req,res) => {
		const label = new Label(req.body);
		label.save((err, label) => {
			if(err){
				res.status(404).json(err);
			}
			res.json(label);
		});
	});

//GET request for all the labels
router.route('/')
	.get((req, res) => {
		Label.find({}, (err, labels) => {
			if(err){
				res.status(404).json(err);
			}
			res.json(labels);
		});
	});

//GET request for a specific label
router.route('/:id')
	.get((req, res) =>{
		const _id = req.params.id;
		Label.findOne({_id}, (err,label) => {
			if(err){
				res.status(404).json(err);
			}
			if(!label){
				res.status(404).json({message: 'Label not found'});
			}
			res.json(label);
		});
	});

//PUT request
router.route('/:id')
	.put((req, res) => {
		const _id = req.params.id;
		Label.findOneAndUpdate(
			{_id},
			req.body,
			{new:true},
			(err,contact) => {
				if(err){
					res.status(400).json(err);
				}
				res.json(contact);
			}
		);
	});

//DELETE request
router.route('/:id')
	.delete((req, res) =>{
		const _id = req.params.id;
		Label.findOneAndRemove( 
			{_id}, 
			(err, label) => {
				if(err){
					res.status(400).json(err);
				}
				if(!label){
					res.status(404).json({message: 'Label not found'});
				}
				res.json({message: `Label ${label.label_name} with id ${label._id} deleted.`});
		});
	});


module.exports = router;
