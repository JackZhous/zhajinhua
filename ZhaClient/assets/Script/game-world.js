const global = require("./global")
const EventListener = require("event-listener")
/**
 * 游戏房间视图逻辑
 */
cc.Class({
    extends: cc.Component,

    properties: {
        //个人玩家属性，类型是cocos的预制视图
        player_node_prefab: {
            default:null,
            type:cc.Prefab
        },
        //玩家位置
        player_pos_list:{
            default:[],
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this._index = 0;
        this._playerList = [];
        global.eventlistener = EventListener({});
        global.eventlistener.on("sync_data",  (data) => {
            console.log("game world sync " + JSON.stringify(data));
            global.playerData.uid = data.uid;
            this._index = data.index;
            this.createPlayer(data.uid, 0);
        });

        global.eventlistener.on("player_join", (data) =>{
           console.log("player join" + JSON.stringify(data));
           var seat_index = data.index - this._index;
           //比当前用户早加入进房间的，位置要在本用户前面
           if (seat_index < 0){
               seat_index = 6 + seat_index;
           }
           this.createPlayer(data.uid, seat_index);
        });

        global.eventlistener.on("player_offline", (uid) => {
            for(let i = 0; i < this._playerList.length; i++){
                var node = this._playerList[i];
                if(node.getComponent("player-node").getUid() == uid){
                    node.removeFromParent(true);
                    node.destroy();
                    this._playerList.splice(i, 1);
                    return;
                }
            }
        });
    },

    //uid和座位号index
   createPlayer:function (uid, index) {
        var plaer = cc.instantiate(this.player_node_prefab);
        plaer.parent = this.node;
        plaer.getComponent("player-node").init(uid);
        plaer.position = this.player_pos_list[index].position;
        this._playerList.push(plaer);
   },
});
