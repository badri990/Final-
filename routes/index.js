const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Topic = mongoose.model('topics');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
	res.render('index/start');
});

router.get('/myconfig', ensureAuthenticated, (req, res) => {
	Topic.find({user: req.user.id})
	.then(topics => {
		res.render('index/myconfig', {topics: topics});
	});	
});

router.get('/about', (req, res) => {
	res.render('index/about');
});



module.exports = router;