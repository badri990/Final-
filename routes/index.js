const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index/start');
});

router.get('/myconfig', (req, res) => {
	res.send('Dashboard');
});



module.exports = router;