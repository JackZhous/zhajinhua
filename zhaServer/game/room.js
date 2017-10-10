const Player = require("./player");
const EventListener = require("./event-listener");

const  Room = function (id, socket_event) {
    var that = {};
    var _playerList = [];
    var socket_event = socket_event;        //向socket的注册监听
    var _roomId = id;
    var room_event = EventListener({});     //room和player的监听

    that.getPlayerCount = function () {
        return _playerList.length + 1;
    };

    //玩家加入，自动获取位置序号
    const getIndex = function () {
        var seatMap = {};
        for(let i = 0; i < _playerList.length; i++){
            seatMap[_playerList[i].getIndex()] = true;
        }

        for(let j = 0; j < 6; j++){
            if(!seatMap.hasOwnProperty(j)){
                return j;
            }
        }
    };

    that.getRoomId = function () {
        return _roomId;
    };

    //创建玩家  有玩家加入进来
    that.createPlayer = function (uid, socket) {
        var index = getIndex();

        var plater = Player(uid, socket, room_event);
        _playerList.push(plater);

        plater.sendSyncData({uid:uid, index: index, playerList:_playerList});

        room_event.fire("sendPlayerMessage", {uid:uid, index:plater.getIndex()});
    };

    room_event.on("disconnect", function (uid) {
       for(let i = 0; i < _playerList.length; i++){
           // noinspection JSAnnotator
            if(uid == _playerList[i].getUid()){
                _playerList[i].destroy();
                _playerList.splice(i, 1);
                break;
           }
        }
        //这里有可能会对所有的用户都发送离线消息，这样是不对的，应该只对同一个房间的用户发送才对的
        room_event.fire("sendOfflinePlayerMsg", uid);
        if(_playerList.length <= 0){
            socket_event.fire("room_clear", _roomId);
        }
    });
    return that;
};

module.exports = Room;