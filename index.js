const express = require('express');
const routes = require('./routes/routes');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });

// Cors permite que un cliente se conecte a otro servidor para intercambio de recursos
const cors = require('cors');

// Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
});

// Crear el servidor express
const app = express();

// Habilitar el bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir un dominio(s) para las peticiones en un arreglo
const whiteList = [process.env.FRONTEND_URL];

// Opciones de CORS para dar acceso o no a los endpoint
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin);
        // Revisar si la petición viene de un servidor que está en whiteList
        const existe = whiteList.some(dominio => dominio === origin);

        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Habilitar cors
app.use(cors(corsOptions));

// Asignar el router
app.use('/', routes());

// Carpeta pública
app.use(express.static('uploads'));

// Variables del puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '4800';

// Asignando el puerto
app.listen(port, host, () => {
    console.log("El servidor está ejecutándose en el puerto: " + port);
});