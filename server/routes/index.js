var express = require('express');
var router = express.Router();
var authentication = require('./authentication');
var user = require('./user');

router.use('/auth', authentication);
router.use('/user', user);

module.exports = router;
