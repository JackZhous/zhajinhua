cc.Class({
    extends: cc.Component,

    properties: {
       uid_label:{
           default: null,
           type: cc.Label,
       },
        sprite_frame:{
           default:[],
            type:cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.addComponent(cc.Sprite).spriteFrame = this.sprite_frame[Math.round() * this.sprite_frame.length]
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    init: function (uid) {
        this.uid_label.string = uid + "";
    }
});
