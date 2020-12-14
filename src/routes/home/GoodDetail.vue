<template>
    <div class='qf-good-detail'>
        <div class="name" v-text='info.name'></div>
        <div class="img">
            <img :src="$img.imgBaseUrl+info.img" :alt="info.name">
        </div>
        <div class="price">$<span v-text='info.price'></span></div>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" @click='buy'/>
        </van-goods-action>
    </div>
</template>

<script>
import { 
    GoodsAction, 
    GoodsActionIcon, 
    GoodsActionButton,
    Toast
} from 'vant';
    export default {
        components:{
            [GoodsAction.name]:GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton
        },
        data:function(){
            return {
                info:{},
                timer:null
            }
        },
        mounted(){
            let id = this.$route.params.id;
            console.log("this.$route.params",this.$route);
            console.log('_id', id);
            // 调接口获取商品详情
            this.$api.fetchGoodInfo({id}).then(res=>{
                console.log('商品详情',res);
                this.info = res;
            })
        },
        methods:{
            buy(){
                let data = {
                    good_id:this.info._id,
                    num:1
                };
                this.$api.fetchAddCart(data).then(res=>{
                    console.log('加入购物车',res);
                    Toast.success('购买成功')
                    this.timer = setTimeout(()=>{
                        this.$router.replace('/cart')
                    },1000)
                })
            }
        },
        beforeDestory(){
            clearTimeout(this.timer)
        }
    }
</script>

<style lang="scss" scoped>
.qf-good-detail{
    .name{
        font-size:0.507rem ;
        text-align: center;
    }
    .img{
        &>img{
            display: block;
            width:90%;
            height:9.33rem;
            margin:.27rem auto;
        }
    }
    .price{
        margin-left:0.4rem;
    }
}
</style>