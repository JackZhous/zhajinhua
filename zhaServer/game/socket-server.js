const Socket = require("socket.io");

const SocketServer = function (server) {
    var that = Socket(server);
    that.on("connection", function () {
        console.log("server connection");
    });
    return that;
}

module.exports = SocketServer;