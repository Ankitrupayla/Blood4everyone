const express = require('express');
const router = express.Router();
const fs = require('fs');
const requests = JSON.parse(fs.readFileSync('./data/requests.json'));

router.get('/', (req, res) => res.json(requests));
router.post('/', (req, res) => {
  requests.push(req.body);
  fs.writeFileSync('./data/request.json', JSON.stringify(requests, null, 2));
  res.status(201).json({ success: true, request: req.body });
});

module.exports = router;