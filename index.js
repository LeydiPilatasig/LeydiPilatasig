const app = require ('./src/config/sever');
const mysql =require('./src/config/conexion');
const links = require('./src/routers/links')(app);

