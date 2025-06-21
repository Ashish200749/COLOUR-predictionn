const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('.'));

app.get('/latest-result', (req, res) => {
  try {
    const data = fs.readFileSync('latest.json');
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ number: "N/A" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});