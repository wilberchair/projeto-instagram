const mongoose = require('mongoose');

// representação do nosso banco de dados em formato JS para ter acesso a todas informações
const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);
