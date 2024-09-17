// Create web server
const express = require('express');
const { comments } = require('./data/comments');

// Create the server
const app = express();

// Set up the server to accept JSON
app.use(express.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const { body } = req.body;
  if (body) {
    const newComment = {
      id: comments.length + 1,
      body
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ msg: 'Please include a body with your comment' });
  }
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
  }
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (comment) {
    const { body } = req.body;
    if (body) {
      comment.body = body;
      res.json(comment);
    } else {
      res.status(400).json({ msg: 'Please include a body with your comment' });
    }
  } else {
    res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
  }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
  }
});

// Start the server
app.listen(4001, () => {
  console.log('Server is listening on port 4001');
});
// End of comments.js

// Start the server
app.listen(4001