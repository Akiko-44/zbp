# GAC 移动端

> Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install # Or npm install

# serve with hot reload at localhost:3002
$ npm run dev

# 打包
$ npm run generate # 项目不依赖于 node，为了得到预渲染效果提升性能和减少开发成本，请使用这个命令进行打包生成静态页面，如果项目中写了和服务端相关的代码，请参照官方文档进行正确的部署。

# 其它
1. 项目基于375px设计稿进行，自动转 rem
2. 小图标请放到 /static/icons 里，会自动生成 sprite 图片，使用时 ico-* 加图标文件名
3. 接口调用：this.$service('serviceName', { data: {}, resources: [id, action] })，#data：表单数据，resources： /user/:id/:action
4. 接口定义：在 plugins/sercvice 里定义接口
5. 项目基于 vant UI组件库，地址：https://youzan.github.io/vant
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
