require('dotenv').config();
const app = require('express')();
const routes = require('./routes/routes');
require('./auth/auth.js');

routes(app);

app.listen(4000, () => console.log("Backend executando..."));