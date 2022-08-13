import 'dotenv/config'      // Cargar variables de entorno
import Servidor from "./models/server.js";



// Instancia de la clase Server
const server = new Servidor();


server.listen();
