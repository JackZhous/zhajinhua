const EventListener = function (obj) {
    var Register = {};

    //注册事件
    obj.on = function (name, method) {
        if(!Register.hasOwnProperty(name)){
            Register[name] = [];
        }
        Register[name].push(method);
    };
    //调用事件
    obj.fires = function (name) {
        if(Register.hasOwnProperty(name)){
            var methodList = Register[name];
            //遍历每个事件
            for(let i = 0; i < methodList.length; i++){
                //方法和参数
                let method = methodList[i];
                var args = [];
                //arguments是这个方法的默认参数，第一个是name所以不需要
                for(let j = 1; j < arguments.length; j++){
                    args.push(arguments[j]);
                    method.apply(this, args);           //执行
                }
            }
        }
    };

    obj.off = function () {

    };

    obj.destroy = function () {

    };

    return obj;
};

module.exports = EventListener;