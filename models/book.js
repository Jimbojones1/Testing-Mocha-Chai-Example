let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  year: {type: Number, required: true},
  pages: {type: String, required: true}
})


module.exports = mongoose.model('book', BookSchema);

