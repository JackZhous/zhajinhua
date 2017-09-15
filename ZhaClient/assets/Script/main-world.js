const global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
       editbox:{
           default: null,
           type: cc.EditBox
       }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    buttonClick: function (event, customEvent) {
        var uid = this.editbox.string;
        if(uid.length > 0){
            global.eventlistener.fires("login",uid);
        }
    },
});
