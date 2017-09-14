# Socket.io

## 客户端和服务端连接

1. 服务端调用Socket模块，初始化Socket并监听端口
```javascript
var server = http.createServer(app);			//server来自于bin下的www文件
var that = Socket(server);
    that.on("connection", function () {			//有连接时触发回调
        console.log("server connection");
    });
```

2. 客户端调用Socket模块，向服务器某端口发起连接

```javascript
 global.Socket = io("localhost:3000");			//调用Socket模块io方法连接
```
