## GAC 后台管理系统  
基于 <a href="https://panjiachen.github.io/vue-element-admin-site">vue-element-admin</a>  

## 目录结构  
.  
├── build # webpack cli 相关配置  
├── config # webpack cli 相关配置  
├── dist # 打包目录  
│   └── static  # 静态资源  
├── scripts # 部署脚本  
├── src # 源码  
│   ├── api # 后端接口  
│   ├── assets # 图片等公共资源  
│   ├── components # 通用组件  
│   ├── directive # 通用指令  
│   ├── filters # 通用过滤器  
│   ├── icons # 图标  
│   ├── lang # 国际化语言  
│   ├── router # 路由  
│   ├── store # 全局状态  
│   ├── styles # 公共样式  
│   ├── utils # 通用工具  
│   ├── vendor # 通用插件  
│   └── views # 视图  
└── static # 静态资源  
    └── tinymce4.7.5  

## 运行  
环境要求：
```
"engines": {
  "node": ">= 4.0.0",
  "npm": ">= 3.0.0"
},
```  
安装依赖：  
```
yarn install / npm install
```
开发环境：
```
npm run dev # 开发环境  
```  
生产环境：  
```
npm run build:prod
```
部署：  
```
npm run release
```


