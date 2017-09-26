const Player = require("./player");
const EventListener = require("./event-listener");

const  Room = function () {
    var that = {};
    var _playerList = [];
    var _event = EventListener({});

    that.getPlayerCount = function () {
        return _playerList.length;
    };

    that.createPlayer = function (uid, socket) {
        var plater = Player(uid, socket, _event);
        _playerList.push(plater);
        plater.sendSyncData({uid:uid, index: _playerList.length - 1, playerList: _playerList});

        _event.fire("sendPlayerMessage", {uid:uid, index:_playerList.length - 1});
    };
    return that;
};

module.exports = Room;