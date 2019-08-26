const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('Inside the GET Users route');
  console.log(req.sessionID);
  res.status(200).send({ message: 'Here should be users' });
});

/* POST user create */
router.post('/', (req, res, next) => {
  res.status(201).send({ success: 'User Successfully Created'});
})

module.exports = router;
