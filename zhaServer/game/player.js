const Player = function (uid, socket, event) {
  var that = {};
  var _uid = uid;
  var _socket = socket;
  var _event = event;

    /**
     * 同步数据,表示我已经登录了
     * @param data
     */
  that.sendSyncData = function (data) {
    console.log(("syncData " + JSON.stringify(data)));
    socket.emit("sync_data", data);
  };

  const sendCreatePlayerMsg = function (data) {
    console.log("send create player msg" + JSON.stringify(data));
  };

  _event.on("sendPlayerMessage", sendCreatePlayerMsg);

  that.destroy = function () {
    _event.off("sendPlayerMessage", sendCreatePlayerMsg);
  };
  return that;
};

module.exports = Player;