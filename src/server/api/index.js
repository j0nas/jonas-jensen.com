const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
    res.send('Hello, world!'));

const searchParam = 'search';
router.get('/:' + searchParam, (req, res) =>
    setTimeout(() => res.json("Delayed response with received value: " + req.params[searchParam] + "ms"), req.params[searchParam]));

module.exports = router;
