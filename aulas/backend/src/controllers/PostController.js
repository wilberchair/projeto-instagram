const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  // este metodo recebe os dados do arquivo, redimensiona o arquivo, deleta o original e salva no BD
  async store(req, res) {
    const {
 author, place, description, hashtags 
} = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const filename = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', filename),
      );

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename,
    });

    // irá emitir uma informação para os usuários conectados na minha app em tempo real
    req.io.emit('post', post);

    return res.json({ post });
  },
};
