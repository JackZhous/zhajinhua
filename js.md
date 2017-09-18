# Socket.io

## node.js服务端搭建

+ 安装node.js的framework代码
+ 安装express框架，这个框架可以帮助我们自动创建node代码框架

### Windows安装步骤

1. 去node.js官网下载framework，安装都很简单--略过
__检查是否安装成功？__
在cmd命令下，敲node -v查看版本信息或者npm v查看版本信息； npm是node一个工具命令，可以帮助我们下载下个步骤的express
2. 在命令行中敲入以下两条命令：
```
npm install express -g  //全局安装express
npm install express-generator -g	//安装这条命令后，才能自动创建工程文件
```
3. 使用部分命令
```
express  //自动创建工程
npm install xxx			//默认安装xxx模块到当前文件
npm start			//启动当前路径下的服务
```


## 客户端和服务端连接

1. 服务端调用Socket模块，初始化Socket并监听端口
```javascript
global.Socket = io("localhost:3000");			//调用Socket模块io方法连接
var server = http.createServer(app);			//server来自于bin下的www文件
var that = Socket(server);
    that.on("connection", function (socket) {			//有连接时触发回调
        console.log("server connection");
	socket.on("login", function(username)){
			//登录接口，实现登录逻辑	
	};
    });
```

2. 客户端发起请求
```javascript
Socket.emit("login", uid);		//调用Socket模块emit方法发起请求即可
```
