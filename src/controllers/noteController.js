const noteModel = require('../models/note');



const createNote = async (req, res) => {
    const { description, title } = req.body;


    const newNote = new noteModel({

        title: title,
        description: description,
        userId: req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'message': "something went wrong  while creating a note"
        });
    }



};
const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(200).json(note)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'message': "something went wrong  while Deleting a node a note"
        });
    }
};
const getNote = async (req, res) => {

    try {
        const note = await noteModel.find({ userId: req.userId });
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'message': "something went wrong  while fetching  a note"
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { description, title } = req.body;
        const id = req.params.id;


        const newNote = {
            id: req.userId,
            description: description,
            title: title

        }

        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            'message': "something went wrong  while Updatibg  a note"
        });
    }
};


module.exports = {
    createNote,
    deleteNote,
    getNote,
    updateNote
};