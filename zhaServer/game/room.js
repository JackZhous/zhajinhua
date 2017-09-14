const Player = require("player");

const  Room = function () {
    var that = {};
    var playerList = [];
    that.getPlayerCount = function () {

    };

    that.createPlayer = function (uid, socket) {
        playerList.push(Player(uid, socket));
    };
    return that;
}

module.exports = Room;