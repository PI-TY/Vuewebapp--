import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Home = ()=>import('@/routes/home/Home.vue');
const Find = ()=>import('@/routes/find/Find.vue');
const User = ()=>import("@/routes/user/User.vue");
const Cart = ()=>import('@/routes/cart/Cart.vue');
const GoodDetail = ()=>import('@/routes/home/GoodDetail.vue');
const Login = ()=>import('@/routes/user/Login.vue')
const Regist = ()=>import('@/routes/user/Regist.vue')
const router = new VueRouter({
    mode:'hash',
    routes:[
        {path:'/',components:{alive:Home}},
        {path:'/find',component:Find},
        {path:'/user',component:User},
        {path:'/cart',component:Cart},
        {path:'/login',component:Login},
        {path:'/regist',component:Regist},
        {path:'/good/detail/:id',component:GoodDetail},
        {path:'/',redirect:'/'}
    ]
})

// 全局导航守卫（路由守卫）
// 它的作用，阻止未登录用户进入需要权限的页面
router.beforeEach((to,from,next)=>{
    console.log("to到那个界面",to);
    console.log("from哪个界面来",from);
    let token = localStorage.getItem('token');
    // 第一重判断：判断哪些页面需要被守卫（保护）
    let pageArr = ['/cart','/user'];
    if(pageArr.includes(to.path)){
        // 第二重判断，用token表示用户是否登录。如果已登录，可以访问私密页面；如果未登录，不让访问私密页面。
        if(token){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})
export default router