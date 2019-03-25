# front-end
系统程序设计前端页面  
[功能说明文档](https://github.com/hsfy19091/SystemProgramingFontEnd/blob/master/%E9%A1%B9%E7%9B%AE%E8%AE%BE%E8%AE%A1.V2018.05.22.pdf)
### 目标
* 实现基本功能
* 基于REST风格重新封装axios(×)
## 技术栈  
> vue \+ vue-router\+ vuex\+ axios\+ element-ui\+ SpringBoot\+ spring-data-jpa\+ sl4j等  
## 2019.3.18  
添加了删除监考人信息的方法
## 2019.3.19  
完成功能：监考分配的增删改查  
待改善逻辑：按钮点击触发事件以及误操作引起的数据问题  
## 2019.3.21
完成功能：任务界面的增删改查  
新用到的方法:element table 的 formate属性，参数为一个方法，可以对数据进行格式化，以及如何用js实现sleep效果
## 2019.3.25
完成任务:   
管理员端的任务管理、用户端个人信息修改模块、监考信息模块、任务提交模块  
其他:  
更改了文件上传的逻辑
## 安装过程
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
