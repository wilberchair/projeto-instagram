const multer = require('multer');
const path = require('path');

// configuração do destino para onde os arquivos vão, usando o nome original do arquivo
module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
