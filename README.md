# Login
登录系统

# 项目src布局
```

├── assets 静态资源、自维护插件
├── components 组件组
├── libs 再次封装公共组
├── index.less index样式文件
├── index.vue 页面入口文件
├── main.js 程序入口文件，加载各种公共组件

```

# 描述
* 自己平时工作的时候搭建的一套脚手架，现在整理了一份登录的平台方便后续使用

因为这个登录只用得到一个页面就没有接入vue-router和vuex进来
* 项目采用vue2.5+webpack3.10驱动
* axios 0.16有二次封装，在接口返回的时候做了消息截取和判断
libs有的工具库不是自己写的，有可能没有用处，如果用不到的方法可以去掉和合并。
* regExp整理了一些正则表达式
* 页面模板采用的pug，不喜欢的话可以不用pug

# 使用
```
// 安装依赖项
npm install
// 开发
npm run dev
// 生产
npm run build

```

### PS：刚开始接触vue的小白鼠也可以拿来用的哈，如果有问题欢迎提问oo
blog地址：www.z-im.com

demo地址：https://chengzi512.github.io/vue-webpack/dist/