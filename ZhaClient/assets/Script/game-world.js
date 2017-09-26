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
        global.eventlistener = EventListener({});
        global.eventlistener.on("sync_data",  (data) => {
            console.log("game world sync " + JSON.stringify(data));
            global.playerData.uid = data.uid;
            var index = 0;
            this.createPlayer(data.uid, index);
        });
    },

    //uid和座位号index
   createPlayer:function (uid, index) {
        var plaer = cc.instantate(this.player_node_prefab);
        plaer.parent = this.node;
        plaer.getComponent("player-node").init(uid);
        plaer.position = this.player_node_prefab[index].position;
   }


});
