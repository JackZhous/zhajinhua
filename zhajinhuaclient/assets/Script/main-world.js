cc.Class({
    extends: cc.Component,

    properties: {
       edit_box:{
           default: null,
           type: cc.EditBox
       }
    },

    // use this for initialization
    onLoad: function () {

    },

    buttonClick: function (event, customData) {
        console.log("i am clicked" + customData);
        console.log("edit box valur: " + this.edit_box.string);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
