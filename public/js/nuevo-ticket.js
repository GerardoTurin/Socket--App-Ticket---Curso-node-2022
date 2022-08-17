// Refericias Html:
const nuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrearTicket = document.querySelector('button');




const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrearTicket.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrearTicket.disabled = true;
});


// mostrar ultimo ticket
socket.on('ultimo-ticket', (UltimoTicket) => {
    nuevoTicket.textContent = `Ticket ${UltimoTicket}`;
});


btnCrearTicket.addEventListener( 'click', () => { 
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        nuevoTicket.textContent = `${ticket}`;
    });

});