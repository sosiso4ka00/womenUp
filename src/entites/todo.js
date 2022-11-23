const { Schema, Types , model} = require('mongoose');

const todoSchema = new Schema({
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    title: String,
    marked: {
        type: Boolean,
        default: false
    }
});

module.exports.Todo = model('Todo', todoSchema)
