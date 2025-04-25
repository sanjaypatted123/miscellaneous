const express = require('express');
const app = express();
const PORT = 3000;

const books = [
  "Harry Potter",
  "Hunger Games",
  "Hobbit",
  "Hamlet",
  "Head First Java",
  "Heroes of Olympus",
  "Hard Times",
];

app.use(express.static('public'));

app.get('/api/search', (req, res) => {
  const query = req.query.query?.toLowerCase();

  if (!query || query.length < 3) {
    return res.status(400).json([]);
  }

  const results = books.filter(book =>
    book.toLowerCase().includes(query)
  );

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
