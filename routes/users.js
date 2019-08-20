var express = require('express');
var router = express.Router();

var dummyData = require('../public/fake-users.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(dummyData);
});

router.post('/', function (req, res, next) {
  res.status(201).send({ success: 'User Successfully Created'});
})

module.exports = router;
