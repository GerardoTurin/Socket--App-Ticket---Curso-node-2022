import { readFile } from 'fs/promises';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import path from 'path';
const data = JSON.parse(await readFile(new URL('../db/data.json', import.meta.url)));



class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl {
    constructor() {
        this.ultimo = 0;    // ultimo ticket: 0 porque no hay tickets
        this.diaHoy = new Date().getDate(); // obtenemos el dia de hoy
        this.tickets = [];  // array de tickets pendientes
        this.ultimosCuarto = [];    // ultimos cuartos, se van a mostrar en el html

        this.init();    // Llamamos a la funcion init; Leemos el archivo data.json y lo guardamos en el localstorage
    }
    
    
    get toJson() {  // Aqui se convierte el objeto a un json para poder guardarlo en el localstorage
        return {
            ultimo: this.ultimo,
            diaHoy: this.diaHoy,
            tickets: this.tickets,
            ultimosCuarto: this.ultimosCuarto
        };
    }
    
    
    init() {    // Inicializamos el sevidor ( clase )
        const { ultimo, diaHoy, tickets, ultimosCuarto } = data;

        if (diaHoy === this.diaHoy) {
            this.ultimo = ultimo;
            this.tickets = tickets;
            this.ultimosCuarto = ultimosCuarto;
        } else {
            // Es otro dia
            this.guardarDB();
        }
    }


    guardarDB() {   // Guardamos los datos en el localstorage
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    // Funcion para obtener el siguiente ticket
    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();   // Guardamos los datos en la base de datos
        return `Ticket ${this.ultimo}`;
    }



    // Funcion para atender un ticket
    atenderTicket(escritorio) {
        // Si no hay tickets pendientes
        if (this.tickets.length === 0) {
            return null;
        }

        /*
        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.escritorio = escritorio; 
         */



        const numeroTicket = this.tickets.shift(); // this.tickets[0]; Elimina el primer elemento del array
        numeroTicket.escritorio = escritorio;

        this.ultimosCuarto.unshift(numeroTicket); // Agrega al inicio del array
        if (this.ultimosCuarto.length > 4) {
            this.ultimosCuarto.splice(-1, 1); // Elimina el ultimo elemento del array
        }

        this.guardarDB();
        return numeroTicket;
    }

};



export default TicketControl;




