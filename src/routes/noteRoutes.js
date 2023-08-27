const express = require('express');
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const { createConnection } = require('mongoose');
const auth = require('../middleware/auth');
const noteRouter = express();


noteRouter.get('/getnote', auth, getNote);

noteRouter.post('/createnote', auth, createNote);

noteRouter.delete('/:id', auth, deleteNote);

noteRouter.put('/:id', auth, updateNote);
module.exports = noteRouter;
