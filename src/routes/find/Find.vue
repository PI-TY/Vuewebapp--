<template>
    <div class='qf-find'>
        <div class="left">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item 
                    v-for='item in cateArr'
                    :key='item.id'
                    :title="item.cate_zh" />

            </van-sidebar>
        </div>
        <div class="right">
            <van-grid :column-num="3">
                <van-grid-item v-for="item in goodObj[activeKey]" :key="item._id">
                     <div class="good-item">
                        <img :src="$img.imgBaseUrl+item.img"/>
                        <div v-text='item.name'></div>
                    </div>                
                </van-grid-item>
            </van-grid>
        </div>
        <TabBar/>
    </div>
</template>

<script>
import {TabBar} from '@/components/';
import {mapActions,mapState,mapMutations} from 'vuex';
import { 
    Sidebar,
    SidebarItem,
    Grid, 
    GridItem 
} from 'vant';
    export default {
        components:{
            TabBar,
            [Sidebar.name]:Sidebar,
            [SidebarItem.name]:SidebarItem,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem
        },
        data:function(){
            return{
                activeKey:0,
                cateArr:[]
            }
        },
        computed:{
            ...mapState('good',['goodObj'])
        },
        watch:{
            // 在这里实现缓存：
            // 当侧边栏发生品类切换时，我们首先要去判断goodObj有没有我想要的数据
            // 如果有直接用，不必调接口
            // 如果没有，再调接口，并缓存
            activeKey:function(){
                let arr = this.goodObj[this.activeKey]
                console.log('this.activeKey',this.activeKey)
                // 当Vuex中没有我想要的数据时
                if(!(arr)){
                    let params = {
                        cate: this.cateArr[this.activeKey].cate,
                        size: 1000,
                        index: this.activeKey
                    }
                    this.fetchList(params)
                }
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            ...mapActions('good', ['fetchList']),
            ...mapMutations('good', ['clearGoodObj']),
            async init(){
                // 第一步，获取品类列表
                const res = await this.$api.fetchAllCates({})
                console.log("获取品类列表res",res);
                this.cateArr = res.list;
                // 第二步，根据第一个品类下面的商品列表
                let params = {
                    cate:this.cateArr[this.activeKey].cate,
                    size:1000,
                    index:this.activeKey
                }
                // 触发actions
                this.fetchList(params)
            }
        },
        beforeDestroy(){
            // 触发mutaions方法，清除缓存
            this.clearGoodObj()
        }
    }
</script>

<style lang="scss" scoped>
.qf-find{
    //用浮动不能实现left与right在同一排,得用position定位
    .left{
        width:2.133rem;
        // float:left;
        position:absolute;
        top:0;
        left:0;
        overflow: auto;
        bottom: 2.13rem;
    }
    .right{
        position:absolute;
        // float:right;
        top:0;
        bottom:1.33rem;
        right:0;
        overflow: auto;
        left:2.13rem;
        .good-item{
            &>img{
                width:1.4rem;
                height:1.4rem;
            }
            &>div{
                font-size: .4rem;
            }
        }
    }
}
</style>