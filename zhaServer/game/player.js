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
    console.log("syncData " + JSON.stringify(data));
    socket.emit("sync_data", data);
    var length = data.playerList.length - 1;

    for(let i = 0; i < length; i++){

      sendCreatePlayerMsg({uid:data.playerList[i].getUid(), index:i});
    }
  };

  that.getUid = function () {
    return _uid;
  };

  const sendCreatePlayerMsg = function (data) {
    console.log("send create player msg" + JSON.stringify(data));
    if(data.uid != _uid){
        socket.emit("player_join", data);
    }
  };

  //多个player都调用这个方法则都在event都会保存多个注册者
  _event.on("sendPlayerMessage", sendCreatePlayerMsg);

  that.destroy = function () {
    _event.off("sendPlayerMessage", sendCreatePlayerMsg);
  };
  return that;
};

module.exports = Player;