var Socket = require("socket.io");
var Room = require("room");


const SocketServer = function (server) {
    var that = Socket(server);
    var roomList = [];
    that.on("connection", function (socket) {
        console.log("server connection");
        //监听登录
        socket.on("login", function (uid) {
            if(roomList[roomList.length - 1].getPlayerCount() > 6){
                roomList.push(Room());
            }
            roomList[roomList.length - 1].createPlayer(uid, socket);
            console.log("a person joined in, uuid = " + uid);
        });

    });
    return that;
}

module.exports = SocketServer;