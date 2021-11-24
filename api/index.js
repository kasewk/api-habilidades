const express = require('express');
const app = express();
const routes = require('./routes/routes');
const multer = require('multer');
require('dotenv').config();
require('./auth/auth.js');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
  })
  
const upload = multer({ storage })

routes(app, upload, express);

app.listen(4000, () => console.log("Backend executando..."));