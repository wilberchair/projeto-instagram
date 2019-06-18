const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController')

const routes = new express.Router();
//multer permite que o express entenda o corpo que enviamos atraves do insomnia formato multipart form data
const upload = multer(uploadConfig);

//rotas que retornam os posts do feed
routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

//rota que permite realizar likes
routes.post('/posts/:id/like', LikeController.store)

module.exports = routes;

//Estas rotas estão detalhadas em Controllers