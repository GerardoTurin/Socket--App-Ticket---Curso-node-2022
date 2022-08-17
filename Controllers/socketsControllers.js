import TicketControl from "../models/ticket-control.js";





const ticketControl = new TicketControl();



const socketController = (socket) => {
    
    // Cuando se conecta el cliente, se le envia el numero de ticket actual
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimosCuarto);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        
        // Notificar que hay un nuevo ticket
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ( { escritorioActual }, callback ) => {
        if (!escritorioActual) {
            return callback({
                ok: false,
                mensaje: 'El escritorio es necesario'
            });
        }
        
        const atenderTicket = ticketControl.atenderTicket(escritorioActual);    // Atender ticket: retorna el ticket atendido

        // Notificar cambio de estado en los ultimos cuartos
        socket.broadcast.emit('estado-actual', ticketControl.ultimosCuarto);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!atenderTicket) {
            return callback({
                ok: false,
                mensaje: 'No hay tickets pendientes'
            });
        } else {
            return callback({
                ok: true,
                ticket: atenderTicket
            });
        }

    });
}; 












export { socketController };