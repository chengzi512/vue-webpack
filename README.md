# Login
登录系统

# 项目src布局
```

├── assets 静态资源、自维护插件
├── components 组件组
├── libs 再次封装公共组
├── mock 前端数据模拟
├── pages 页面
├── router 路由配置
├── index.less 公共样式文件
├── index.vue 页面入口文件
├── main.js 程序入口文件，加载各种公共组件

```

## 前端命名规范

### 项目命名

全部采用小写方式， 单词或者拼音首字母。

例：sgc

### 目录命名

有复数结构时，要采用复数命名法。

例：scripts, styles, images, data-models

### JS文件命名

参照项目命名规则。

例：accountModel.js

### CSS, SCSS文件命名

参照项目命名规则。

例：retinaSprites.scss

### HTML文件命名

参照项目命名规则。

例：errorReport.html

### 属性顺序

属性应该按照特定的顺序出现以保证易读性；

- `class`
- `id`
- `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value` , `max-length`, `max`, `min`, `pattern`
- `placeholder`, `title`, `alt`
- `aria-*`, `role`
- `required`, `readonly`, `disabled`

class是为高可复用组件设计的，所以应处在第一位；

id更加具体且应该尽量少使用，所以将它放在第二位。

### boolean属性

boolean属性指不需要声明取值的属性，XHTML需要每个属性声明取值，但是HTML5并不需要；

boolean属性的存在表示取值为true|1，不存在则表示取值为false|0。
### 注释
文件注释，方法注释，复杂逻辑地方的注释，特殊字段


# 组件封装

1. 组件封装规范

封装了组件之后在test文件中自建一个实例文件,尽量多点注释

路由
动态模块、模块封装 components
axios
验证规则：validator
工具库：utils文件夹中分类文件
消息通信:中转站作用 msgHub
图标：iconfont-项目图标

# 学习
## 消息传递
* 父=》子：在 Vue 中，可以使用 props 向子组件传递数据。
* 子=》父：子组件添加事件，父组件在methods中添加$emit来监听事件
* 子=》子：子-父-子