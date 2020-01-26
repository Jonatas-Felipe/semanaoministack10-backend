const sockedio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];

let io;

exports.setupWebsocked = (server) => {
    io = sockedio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connections => {
        return calculateDistance(coordinates, connections.coordinates) < 10 && connections.techs.some(item => techs.includes(item));
    })
};

exports.sendMessege = (to, message, data) => {
    to.forEach(connections => {
        io.to(connections.id).emit(message, data)
    });
}