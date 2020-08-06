const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    letter: String,
    num: Number
}); 

module.exports = mongoose.model('Classes', classSchema);