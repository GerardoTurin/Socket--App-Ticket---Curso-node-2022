//! Refecias al html

const online = document.querySelector('#on');
const offline = document.querySelector('#off');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();


// on: escuchar eventos
// Connection: evento que se ejecuta cuando un cliente se conecta
socket.on('connect', () => {
    console.log('Conectado al servidor');
    offline.style.display = 'none';
    online.style.display = '';
});

// Disconnect: evento que se ejecuta cuando un cliente se desconecta
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    online.style.display = 'none';
    offline.style.display = '';
});



socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});






btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        nombre: 'Gera',
        fecha: new Date().getTime()
    }


    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Mensaje enviado desde Server', id);
    } );
});