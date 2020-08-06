const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    id: Number,
    name: String
}); 

module.exports = mongoose.model('Subjects', subjectSchema);