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
        plater.sendSyncData({uid:uid, playerList: _playerList});
        _playerList.push(plater);

        _event.fire("sendPlayerMessage", {uid:uid, index:_playerList.length - 1});
    };
    return that;
};

module.exports = Room;