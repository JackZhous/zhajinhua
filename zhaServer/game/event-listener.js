const EventListener = function (obj) {
    var register = {};

    //注册事件
    obj.on = function (name, method) {
        if(!register.hasOwnProperty(name)){
            register[name] = [];
        }

        register[name].push(method);
    };


    //调用事件
    obj.fire = function (methodname) {
        if(register.hasOwnProperty(methodname)){
            var methods = register[methodname];
            for(let i = 0; i < methods.length; i++){
                var method = methods[i];
                var args = [];
                for(let j = 1; j < arguments.length; j++){
                    args.push(arguments[j]);
                }

                method.apply(this, args);
            }
        }
    };

    obj.off = function (methodName, method) {
        if(register.hasOwnProperty(methodName)){
            var methods = register[methodName];
            for(let i = 0; i < methods.length; i++){
                if(methods[i] == method){
                    methods.splice(i, 1);
                }
            }
        }
    };

    obj.destroy = function () {

    };

    obj.removeAllListener = function () {
        register = {};
    };
    return obj;
};

module.exports = EventListener;