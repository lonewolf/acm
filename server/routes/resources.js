const express = require('express');
const router = express.Router();
const resource = require('../controller/resource');

router.get('/', function (req, res, next) {
  res.send('respond with a resources');
});

/**
 * TO get the single resource by param
 */
console.log('get resource');
router.get('/:name', resource.find);

/**
 * To create the New resource
 */
router.post('/', resource.create);

module.exports = router;
