const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topic = mongoose.model('topics');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
	Topic.find({})
		.populate('user')
		.sort({date: 'desc'})
		.then(topics => {
			res.render('topics/index', {
				topics: topics
			});
		});
});


router.get('/show/:id', (req, res) => {
	Topic.findOne({
		_id: req.params.id
	})
	.populate('user')
	.populate('comments.commentUser')
	.then(topic => {
		res.render('topics/show', {
			topic: topic
		});
	});
});

router.get('/add', ensureAuthenticated,  (req, res) => {
	res.render('topics/add');
});

router.get('/edit/:id', ensureAuthenticated,  (req, res) => {
	Topic.findOne({
		_id: req.params.id
	})
	.then(topic => {
		if(topic.user != req.user.id) {
			res.redirect('/topics')
		} else {
			res.render('topics/edit', {
			topic: topic
		});
		}	
	});
	 
});


router.post('/', (req, res) => {
	const newTopic = {
		title: req.body.title,
		body: req.body.topic,
		user: req.user.id 
	}
 
	new Topic(newTopic)
		.save()
		.then(topic => {
			res.redirect(`topics/show/${topic.id}`);
		})

});


router.put('/:id', (req, res) => {
	Topic.findOne({
		_id: req.params.id
	})
	.then(topic => {
		topic.title = req.body.title;
		topic.body = req.body.topic;
		topic.save()
			.then(topic => {
				res.redirect('/myconfig');
			});
	});
});


router.delete('/:id', (req, res) => {
	Topic.deleteOne({_id: req.params.id})
		.then(() => {
			res.redirect('/myconfig');
		});
});


router.post('/comment/:id', (req, res) => {
	Topic.findOne({
		_id: req.params.id
	})
	.then(topic => {
		const newComment = {
			commentBody: req.body.commentBody,
			commentUser: req.user.id
		}  
		topic.comments.unshift(newComment);
		topic.save()
			.then(topic => {
				res.redirect(`/topics/show/${topic.id}`);
			});
	});
});


module.exports = router;