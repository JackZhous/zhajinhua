const Socket = require("socket.io");
const Room = require("./room");
const EventListener = require("./event-listener");

const SocketServer = function (server) {
    var that = Socket(server);
    var roomList = [];
    var _event = EventListener({});

    that.on("connection", function (socket) {
        console.log("server connection");

        //监听登录
        socket.on("login", function (uid) {
            if(roomList.length == 0){
                roomList.push(Room(getRoomId(), _event));
            }

            //变量所有的房间，自动添加玩家进入房间
            for (let i = 0; i < roomList.length; i++){
                if(roomList[i].getPlayerCount() > 6){
                    continue;
                }
                roomList[i].createPlayer(uid, socket);
                return;
            }
            roomList.push(Room(getRoomId(), _event));
            roomList[roomList.length - 1].createPlayer(uid, socket);
        });

    });

    //room空了，清楚房间
    _event.on("room_clear", (room_id) =>{
        for(let i = 0; i < roomList.length; i++){
            var room = roomList[i];
            if(room.getRoomId() == room_id && room.getPlayerCount() <= 1){
                console.log("clear room " + room_id);
                roomList.splice(i, 1);
                return;
            }
        }
    });

    const getRoomId = function () {
        var Datee = new Date();
        return ""+Datee.getMilliseconds();
    };


    return that;
};

module.exports = SocketServer;