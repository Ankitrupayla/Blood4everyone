const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const filePath = path.join(__dirname, '../data/volunteer.json');

// GET volunteers
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    res.json(JSON.parse(data));
  });
});

// POST new volunteer
router.post('/', (req, res) => {
  const newVolunteer = req.body;

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });

    let volunteers = JSON.parse(data);
    volunteers.push(newVolunteer);

    fs.writeFile(filePath, JSON.stringify(volunteers, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save data' });
      res.json({ message: 'Volunteer registered successfully!' });
    });
  });
});

module.exports = router;
