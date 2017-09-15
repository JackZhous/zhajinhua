import global from "./global";
const EventListener = require("event-listener");

cc.Class({
    extends: cc.Component,

    properties: {
       runningWorld:{
           default: null,
           type:cc.Prefab
       },
        main_world_prefab:{
            default: null,
            type:cc.Prefab
        },
        game_world_prefab:{
            default: null,
            type:cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        global.socket = io("localhost:3000");
        global.eventlistener = EventListener({});
        global.eventlistener.on("login", function (uid) {
            console.log("login a person " + uid);
            global.Socket.emit("login", uid);
        });

        global.socket.on("sync_data", function (data) {
           console.log("sync_data " + JSON.stringify(data));
        });
    },

    enterMainWorld:function () {
      if(this.runningWorld != undefined){
          this.runningWorld.removeFromParent(true);
      }

      this.runningWorld = cc.instantiate(this.main_world_prefab);
      this.runningWorld.parent = this.node;
    },
    
    enterGameWorld: function (data) {
        if(this.runningWorld != undefined){
            this.runningWorld.removeFromParent(true);
        }

        this.runningWorld = cc.instantiate(this.game_world_prefab);
        this.runningWorld.parent = this.node;
    }
});
