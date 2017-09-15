const Player = require("./player");

const  Room = function () {
    var that = {};
    var _playerList = [];
    that.getPlayerCount = function () {
        return playerList.length;
    };

    that.createPlayer = function (uid, socket) {
        var plater = Player(uid, socket);
        plater.sendSyncData({uid:uid, playerList: _playerList});
        _playerList.push(plater);
    };
    return that;
}

module.exports = Room;