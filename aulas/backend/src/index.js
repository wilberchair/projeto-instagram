const express = require('express');
const mongoose = require('mongoose');
const path = require('path') //utilizo toda vez que preciso lidar com caminhos relativos
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-v9uyf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//disponibiliza o IO entre todas a aplicação
app.use((req, res, next) =>{
    req.io = io;

    //terceiro parametro para garantir que o código continue rodando e passe para os próx passos abaixo
    next();
})

//este comando permite que todas as urls de diferentes ips e servidores acesse o backend
app.use(cors())

//rota para acessar os arquivos estaticos (imagens)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

//rotas da aplicação
app.use(require('./routes'))

server.listen(3333);