## 移动端APP项目总结
### 技术栈
    在本次项目开发中，用到了很多技术，比如rem布局、Vue框架、路由管理器vue-router、状态管理vuex、sass及UI组件库vant等。
* rem布局中rem是指相对于根元素的字体大小的单位，我们在rem.js中对根元素html确定了一个px字号，设置根字体的大小等于html节点的宽度的十分之一。然后在编辑器中安装 cssrem 插件，并设置转化尺寸为 75。
* 在nodejs中下载vue及vue-router，cnpm install Vue -S,cnpm install vue-router -S。路由在使用时需导入包
```html
import Vue from 'vue'、import VueRouter from 'vue-router'
```
把VueRouter注册一下
```
Vue.use(VueRouter)
const routes = new VueRouter 
```
导出routes，在main.js挂载一下，就可以使用了。
* 安装vuex，cnpm install vuex -S,在需要使用状态管理模式的文件中
```
import Vue from 'vue', import Vuex from 'vuex'
```
并进行注册
```
Vue.use(Vuex)
const store = new Vuex.Store
```
导出store并在main.js中挂载一下。
* 为了在vue中使用sass，我们需要安装sass的依赖包cnpm install sass-loader -D,cnpm install node-sass -D,并修改.vue文件夹下的style标签为 style lang='scss' 就可以了。
* UI组件库vant的安装cnpm install vant -S,vant的引入使用有多种方法，如全局引入、按需引入及使用babel-plugin-import。我们这里推荐使用babel-plugin-import，它会在编译过程中将 import 的写法自动转换为按需引入的方式。使用此方法需要先下载babel-plugin-import包，cnpm install babel-plugin-import -D,然后在项目的babel.config.js文件中添加配置如下
```js
plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
```
然后就可在组件中直接引入vant插件，插件会自动将代码转化为方法二中的按需引入形式如
```html
import { Button } from 'vant'。
```
在项目中我们使用了很多vant组件,比如首页的轮播图组件Swiper轮播、下拉刷新组件PullRefresh、下滑加载组件Loading、顶部通
知栏组件NoticeBar、底部标签栏组件Tabbar、分类页的布局组件Layout、侧边导航组件Sidebar、侧边商品排列用Grid宫格、商品详情页的商品导航组件GoodsAction、购物车页面的商品卡片组件cart、提交订单栏组件Submit以及注册，登录页面的表单组件form...
### 开发团队
    我们的开发团队有前端二人，后端三人，UI设计师一人，本次项目开发花费三个月时间，项目已上线。我在其中负责的模块有购物车模块，商品详情模块以及注册登录模块。
### 优化
* 这次开发我们采用了很多性能优化的方法，如分类页的图片信息加载缓存，模块及图片的按需加载，减少http接口请求，多使用静态页面等。
* 采用了SEO优化：使用语义化标签header、section、main、aticle、footer，充分利用css控制样式，多使用title、alt属性、h1~h6标签、meta标签等。
* 实施图片优化：尽可能地避免使用background-image来展示图片，当图片不是特别小时，把图片放在public目录中。代码中使用图片时，使用模块化来管理，不要在组件中使用相对路径，绝对路径引入图片。使用图片懒加载。
* 提升用户体验：埋点，用户点进一个商品，不管其有没有操作，把这个商品信息记录下来。在用户下次进来时为其推荐同类或相关商品;
使用keep-alive缓存首页访问记录;使用下拉刷新,重置商品加载数量;触底加载，加载商品信息。
### 项目难点
    我们在开发中我们也遇到了很多困难，比如UI需要还原度高，前端交互体验要求高，产品需求不稳定等。这需要我们小心仔细的去测量，去思考实现方法。多与产品经理、UI设计师、后端人员进行沟通，减少困难。多查看文档，尽量使用文档来解决交互性bug。bug如果实在想不出方法，可以多询问同事。或者上百度与轮坛查看相关实现方法或者请教大佬...

