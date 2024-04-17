## 项目背景

早期公司里vue2后台管理系统基于 https://github.com/PanJiaChen/vue-element-admin 项目开发，vue2+webpack，项目庞大时启动慢、热更新慢、占用内存高，影响开发者的开发体验和幸福感。



## 改造目标

vue2项目改成vite最新版



## 效果对比

### MacBook Pro M1

|                | vue2+webpack | vue2+vite5 |
| -------------- | ------------ | ---------- |
| 启动           | 7s           | 2s         |
| 初次首屏       | 1s           | 33s        |
| 二次首屏       | 小于1s       | 小于1s     |
| node内存占用   | 515MB        | 169MB      |
| chrome内存占有 | 126MB        | 126MB      |

初次首屏：清空chrome浏览器缓存，首次打开vscode，chrome打开http://localhost:9527/

二次首屏：不清空chrome浏览器缓存，不关闭vscode，关闭chrome，chrome打开http://localhost:9527/



## 改造点

### vue版本

```
"vue": "2.7.16"
"vue-template-compiler": "2.7.16"
```

### vite相关依赖

```
"@vitejs/plugin-vue2": "2.3.1",
"@vitejs/plugin-vue2-jsx": "1.1.1",
"vite": "5.0.12",
"vite-plugin-commonjs": "0.10.1",
"vite-plugin-node-polyfills": "0.19.0",
"vite-plugin-require": "1.1.14",
"vite-plugin-svg-icons": "2.0.1",
"path-browserify": "^1.0.1",
```

### index.html

public\index.html迁移到\index.html，添加以下

```
<script type="module" src="/src/main.js"></script>
```



### Can't find stylesheet to import

解决：@import "~@/styles改成 @import "@/styles



### This experimental syntax requires enabling one of the following parser plugin(s): "jsx", "flow", "typescript"

解决：script标签添加lang="jsx"



### require is not defined

解决：require.context改成如下手动导入

```
import app from './modules/app.js';
import errorLog from './modules/errorLog.js';
```



### The requested module '/src/styles/element-variables.scss' does not provide an export named 'default'

解决：element-variables.scss改成element-variables.module.scss



### mock

解决：由于vite使用原来的mock有问题，且mock是模拟后端接口不影响功能，所以暂时采用原项目的mock，本地启动https://github.com/PanJiaChen/vue-element-admin

Vite.config.js里代理如下：

```
proxy: {
  '/api': {
      target: 'http://localhost:9528',
      rewrite: (p) => p.replace(/^\/api/, '/dev-api'),
   },
},
```



### 若没有头绪

解决：npm run build看哪里报错



## 项目链接

https://github.com/xoobom/vue-element-admin-vite




## 捐赠

如果您觉得这个项目帮助到了您，您可以捐赠 :moneybag: 表示鼓励 :coffee:
<div>
  <img width="250" src="./img/alipay.jpg">
  <img width="250" src="./img/wechatpay.jpg">
</div>