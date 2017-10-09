const Player = function (uid, socket, event) {
  var that = {};
  var _uid = uid;
  var _socket = socket;
  var _event = event;


  //监听玩家掉线
  _socket.on("disconnect", function () {
    console.log("玩家掉线，uid="+_uid);
    _event.fire("disconnect", _uid);
  });
    /**
     * 同步数据,表示我已经登录了
     * @param data
     */
  that.sendSyncData = function (data) {
    console.log("syncData " + JSON.stringify(data));
    _socket.emit("sync_data", data);
    var length = data.playerList.length - 1;

    for(let i = 0; i < length; i++){
      sendCreatePlayerMsg({uid:data.playerList[i].getUid(), index:i});
    }
  };

  that.getUid = function () {
    return _uid;
  };

  //玩家加入消息
  const sendCreatePlayerMsg = function (data) {
    console.log("send create player msg" + JSON.stringify(data));
    if(data.uid != _uid){
        socket.emit("player_join", data);
    }
  };

  //玩家下线消息
  const sendOfflinePlayerMsg = function (uid) {
      _socket.emit("player_offline", uid);
  };

  //多个player都调用这个方法则都在event都会保存多个注册者
  _event.on("sendPlayerMessage", sendCreatePlayerMsg);
  _event.on("sendOfflinePlayerMsg", sendOfflinePlayerMsg);

  that.destroy = function () {
    _event.off("sendOfflinePlayerMsg", sendOfflinePlayerMsg)
    _event.off("sendPlayerMessage", sendCreatePlayerMsg);
  };
  return that;
};

module.exports = Player;