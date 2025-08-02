const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// donors.json का सही पाथ
const donorFilePath = path.join(__dirname, "../data/donors.json");

// GET: सभी donors प्राप्त करें
router.get("/", (req, res) => {
  fs.readFile(donorFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "डोनर डेटा पढ़ने में त्रुटि" });
    }
    const donors = JSON.parse(data);
    res.json(donors);
  });
});

// POST: नया donor जोड़ें
router.post("/", (req, res) => {
  const newDonor = req.body;

  fs.readFile(donorFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "डोनर डेटा पढ़ने में त्रुटि" });

    let donors = [];
    try {
      donors = JSON.parse(data);
    } catch {
      donors = [];
    }

    donors.push(newDonor);

    fs.writeFile(donorFilePath, JSON.stringify(donors, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "डोनर डेटा लिखने में त्रुटि" });
      res.status(201).json({ message: "डोनर सफलतापूर्वक जोड़ा गया" });
    });
  });
});

module.exports = router;
