//! Referecias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const colaPendientes = document.querySelector('#lblPendientes');





const searchParams = new URLSearchParams(window.location.search);   // Para obtener los parametros de la url

if (!searchParams.has('escritorio')) {                            // Si no hay parametro escritorio
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}



const escritorioActual = searchParams.get('escritorio');     // Obtenemos el escritorio actual
lblEscritorio.textContent = `${escritorioActual}`; // Mostramos el escritorio actual en el html

divAlerta.style.display = 'none';


const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


// mostrar ultimo ticket
socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        colaPendientes.style.display = 'none';
    } else {
        colaPendientes.style.display = '';
        colaPendientes.textContent = pendientes;
    }
});


btnAtender.addEventListener( 'click', () => { 

    socket.emit( 'atender-ticket', {escritorioActual}, ( { ok, ticket, msg} ) => {
        if (!ok) {
            lblTicket.textContent = `Nadie !`;
            divAlerta.classList.add('alert-danger');
            return divAlerta.style.display = '';
        } else {
            divAlerta.style.display = 'none';
            lblTicket.textContent = `Ticket ${ticket.numero}`;
        }
    });

    // reducir cola tickets pendientes
    socket.emit('cola-pendientes', {escritorioActual}, ( { ok, msg} ) => {
        if (!ok) {
            colaPendientes.textContent = `0`;
        } else {
            colaPendientes.textContent = `${msg}`;
        }
    });
});