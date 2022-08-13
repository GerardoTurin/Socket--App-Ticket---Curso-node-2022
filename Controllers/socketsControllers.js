


const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    // Desconectar
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // Enviar mensaje
    socket.on('enviar-mensaje', ( payload, callback ) => {
        const id = 123456;
        callback({id, fecha: new Date().getTime()});
        
        // Para todos los clientes conectados
        socket.broadcast.emit('enviar-mensaje', payload);    // emit: para emitir un evento
    });
};










export { socketController };