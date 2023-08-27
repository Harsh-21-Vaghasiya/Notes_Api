const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        userId: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }, { timestamps: true }
);


const noteModel = mongoose.model('Note', schema);
module.exports = noteModel;