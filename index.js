import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de Datos Conectada'))
    .catch(error => console.log(error));

// Hablitar PUG
app.set('view engine', 'pug');

// Obtener año actual para el copyright del footer
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datosdel formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

// Definir el puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
    console.log(`El Servidor OK en el puerto ${port}`);
});
