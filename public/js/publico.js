//! Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

// mostrar ultimo ticket
socket.on('estado-actual', (payload) => {


    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();


    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if (ticket1) {
        lblTicket1.textContent = `Ticket ${ticket1.numero}`;
        lblEscritorio1.textContent = ticket1.escritorio;
    } else {
        lblTicket1.textContent = 'No hay tickets';
        lblEscritorio1.textContent = '';
    }

    if (ticket2) {
        lblTicket2.textContent = ` Ticket ${ticket2.numero}`;
        lblEscritorio2.textContent = ticket2.escritorio;
    } else {
        lblTicket2.textContent = 'No hay tickets';
        lblEscritorio2.textContent = '';
    }

    if (ticket3) {
        lblTicket3.textContent = `Ticket ${ticket3.numero}`;
        lblEscritorio3.textContent = ticket3.escritorio;
    } else {
        lblTicket3.textContent = 'No hay tickets';
        lblEscritorio3.textContent = '';
    }

    if (ticket4) {
        lblTicket4.textContent = `Ticket ${ticket4.numero}`;
        lblEscritorio4.textContent = ticket4.escritorio;
    } else {
        lblTicket4.textContent = 'No hay tickets';
        lblEscritorio4.textContent = '';
    }


});