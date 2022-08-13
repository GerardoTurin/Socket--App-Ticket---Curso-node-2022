import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketController } from '../Controllers/socketsControllers.js';


// import router from '../routes/userRoute.js';


// Requests: Cuando el usuario hace una peticion
// Response: Cuando el servidor responde a una peticion


//! Creamos un servidor con express con clases

class Servidor {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = createServer(this.app);
        this.io = new Server(this.server);      // Socket.io: Servidor de sockets
        
        this.paths = {};


        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();

        
        // Socket.io: Escuchar eventos
        this.sockets();



    }

    middlewares() {

        // Cors
        this.app.use( cors() ); // use: para usar un middleware

        // Directorio carpeta publica
        this.app.use(express.static('public'));   // use: para usar un middleware

    }


    // Rutas de mi app
    routes() {
        // this.app.use( this.paths.usuariosPath, router );
    }


    // Socket.io: Escuchar eventos
    sockets() {
        this.io.on('connection', socketController);
    };




    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}



export default Servidor;