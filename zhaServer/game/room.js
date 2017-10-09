const Player = require("./player");
const EventListener = require("./event-listener");

const  Room = function () {
    var that = {};
    var _playerList = [];
    var _event = EventListener({});

    that.getPlayerCount = function () {
        return _playerList.length + 1;
    };

    that.createPlayer = function (uid, socket) {
        var plater = Player(uid, socket, _event);
        _playerList.push(plater);
        plater.sendSyncData({uid:uid, index: _playerList.length - 1, playerList:_playerList});

        _event.fire("sendPlayerMessage", {uid:uid, index:_playerList.length - 1});
    };

    _event.on("disconnect", function (uid) {
       for(let i = 0, i < _playerList.length; i++){
           // noinspection JSAnnotator
            if(uid == _playerList[i].getUid()){
                _playerList[i].destroy();
                _playerList.splice(i, 1);
           }
        }
        //这里有可能会对所有的用户都发送离线消息，这样是不对的，应该只对同一个房间的用户发送才对的
        _event.fires("sendOfflinePlayerMsg", uid);
    });
    return that;
};

module.exports = Room;