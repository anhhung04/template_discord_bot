const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({

});

const model = new mongoose.model('Name', modelSchema);

module.exports = model;