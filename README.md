
#### 创建项目：
 - npm create-react-app my-app
 - cd my-app
 - npm start

#### 项目目录：
 - 项目目录中public和src目录下的index文件必须存在不能改名，其他的文件可删除和改名；
 - 只有在src根目录下的文件会被webpack编译；
 - 只用public目录下的文件才会被public/index.html引用

#### 脚本命令
- npm start：在http://localhost:3000下监视文件，文件修改将自动更新；
- npm test：启动测试运行程序；
- npm run build：打包编译；
- npm run eject：导出可配置的模板，可自定义修改配置，已上传项目Mars-eject。

#### 之后我还做了：
- src 下新建 components文件夹，在demo文件夹中写了一些小demo
- 新建 reducers 文件夹，暂定存放所有reducer文件，具体说明移步相应文件内
- 新建 store.js,生成全项目 store 容器，具体说明移步相应文件内
- 到目前为止，以计数器开始，尝试了react的核心概念，redux初级使用，react-redux的使用
- 计划下一步方向：接口调用-异步数据获取-触发reducer；路由配置