<template>
    <div class='qf-tabber'>
        <van-tabbar route active-color="#07c160" inactive-color="#000">
            <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
            <van-tabbar-item icon="search" to='/find'>分类</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to='/cart' badge="5">购物车</van-tabbar-item>
            <van-tabbar-item icon="setting-o"
                :to='isLogin?"/user":"/login"'
            >{{isLogin?"我的":"未登录"}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
    export default {
        components:{
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        data:function(){
            return{
                isLogin:false
            }
        },
        mounted(){
            this.isLogin = localStorage.getItem('token')
        },
        // 当keep-alive激活我时
        // 保留缓存后重进页面，不会经历生命周期created与mounted，所以isLogin的改变需放在activated中
        activated(){
            this.isLogin = localStorage.getItem('token')
        }
    }
</script>

<style lang="scss" scoped>
.lk{
    width:0.213rem
}
</style>