# 炸金花接口文档

__注意：__ 

--> 表示客户端请求服务端
<-- 表示服务端响应客户端
接口默认为第二种情况

## 接口列表

### 登录 -->
login(uid) 

### 同步数据（登录后的反馈，表明我已经登录） 
sync_data(uid, playerList)

### 用户加入房间消息
player_join(uid, index)

##$ 用户下线退出房间消息 
player_offline(uid)
