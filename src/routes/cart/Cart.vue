<template>
    <div class='qf-cart'>
        <van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left='back'>
            <template #right>
              <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <!-- 如果没有数据 -->
        
        <div class="no-good" v-if='flag'>
            <img :src="$img.NoCart" alt="购物车为空">
            <div>你还没有添加商品</div>
        </div>
        <div v-else>
            <!-- 对swipe-cell进行循环 -->
            <van-swipe-cell v-for='item in list' :key='item.id'>
                <van-row type="flex" align="center">
                    <van-col span="4">
                        <van-checkbox v-model="item.checked" @click='rowChange'></van-checkbox>
                    </van-col>
                    <van-col span="20">
                        <van-card
                            :num="item.num"
                            :price="item.good.price"
                            :desc="item.good.desc"
                            :title="item.good.name"
                            class="goods-card"
                            :thumb="$img.imgBaseUrl+item.good.img"
                            >
                            <template #footer>
                                <van-button size="mini" @touchstart='update(item,"sub")'>-</van-button>
                                <van-button size="mini" @touchstart='update(item,"add")'>+</van-button>
                            </template>
                        </van-card>
                    </van-col>
                </van-row>
                
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @touchstart='remove(item)' ref="del"/>
                </template>
            </van-swipe-cell>
            
            <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
                <van-checkbox v-model="fullChecked" @click='fullChange'>全选</van-checkbox>
                <template #tip>
                    你的收货地址不支持同城送, <span @click="onClickEditAddr">修改地址</span>
                </template>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
// import {TabBar} from '@/components/';

import { 
    SwipeCell,
    Col,
    Row, 
    Card,
    Checkbox,
    Button,
    SubmitBar,
    NavBar,
    Icon,
    Dialog,
    Toast

} from 'vant';
    export default {
        name:'cart',
        components:{
            [Row.name]: Row,
            [Col.name]: Col,
            [Checkbox.name]: Checkbox,
            [SwipeCell.name]: SwipeCell,
            [Card.name]: Card,
            [Button.name]: Button,
            [SubmitBar.name]: SubmitBar,
            [NavBar.name]: NavBar,
            [Icon.name]: Icon

        },
        data:function(){
            return {
                fullChecked:false,
                list:[],
                timer:null,
                flag:false
                // total:0
            }
        },
        computed:{
              total:function(){
                let t = 0 ;
                // 累加，计算被勾选的总价格
                this.list.map(ele=>{
                    if(ele.checked) t += (ele.num*ele.good.price)*100
                })
                return t;
             }   
        },
        watch:{

        },
        // created(){
        //     this.$api.fetchCart().then(res=>{
        //         console.log('购物车列表', res)
        //         this.list = res;
        //         console.log('created',this.list)
                
        //     })
        // },
        mounted(){
            this.init()
        },
        // watch:{
        //     flag(newVal){
        //         if(this.list.length >0){
        //             newVal = 
        //         }
        //     }
        // },
        methods:{
            init(){
                // console.log('this.list',this.list)
                let arrCheck = [];
                this.list.map((ele)=>{
                    if(ele.checked){
                        arrCheck.push(ele._id);
                    }
                })
                console.log('arrCheck.push',arrCheck);
                this.$api.fetchCart().then(res=>{
                console.log('购物车列表', )
                this.list = res;
                this.flag = this.list.length ===0;
                console.log('this.list长度',this.list)
                this.list.map((ele)=>{
                    console.log('arrCheck.push2',arrCheck);
                    
                    if(arrCheck.includes(ele._id)){
                        console.log(ele._id)
                        ele.checked = true;
                    }
                    console.log("this.list",this.list)
                // 强制执行diff运算，然后强制update页面
                });
                let arr = this.list.filter(ele=>ele.checked)
                if(arr && arr.length === this.list.length){
                    this.fullChecked = true;
                }else{
                    this.fullChecked = false;
                }
                
                this.list = JSON.parse(JSON.stringify(this.list))
                })

            },
            remove(item){
                Dialog.confirm({
                    title: '警告',
                    message: `你确定要删除 ${item.good.name} 这个商品吗？`,
                }).then(() => {
                    this.$api.fetchDelCart({id:item._id}).then(()=>{
                    this.init();
                    console.log("this.total",this.total)
                    // this.list.forEach((ele,idx)=>{
                    //     if(ele._id===item._id){
                    //         let dom = document.getElementsByClassName("van-swipe-cell")[idx];
                    //         dom.remove();
                    //         // this.total = this.total - item.num*item.good.price;
                    //     }
                    // })
                    // this.list = JSON.parse(JSON.stringify(this.list))
                    // console.log(this.list)
                    })
                }).catch(()=>{});
            },
            update(item,sign){
                
                let data = {
                    id:item._id,
                    num:sign === 'sub' ? item.num-1 : item.num+1
                }
                // console.log(sign,data);
                if(data.num<1) return Toast('商品不能少于1')
                this.$api.fetchUpdCart(data).then(res=>{
                    console.log("数量修改成功",res)//underfine
                    // this.init()
                    this.list.map((ele,idx,arr)=>{//arr[idx] = item|
                        if(ele._id === item._id) arr[idx].num = data.num
                    })
                    
                })
                
            },
            back(){
                this.$router.back()
            },
            onClickEditAddr(){
                console.log('跳转地址编辑页')
            },
            onSubmit(){
                console.log('提交购物车');
                let flag = null;
                this.list.map(ele=>{
                    if(ele.checked) flag=true;
                })
                if(flag){
                    let goods = '';
                    this.list.map(ele=>{
                        if(ele.checked) goods += ';'+ele._id
                    })
                    this.$api.fetchSubmitCart({goods}).then(()=>{
                        Toast('下单成功')
                        this.times = setTimeout(()=>{
                            this.init()
                            
                        },1000);
                        // console.log('提交之后list长度',this.list);
                    })
                }else{
                    Toast('您还没有选择商品')
                }
                
            },
            beforeDestory(){
                clearTimeout(this.timer)
            },
            // 全选按钮发生变化时
            fullChange(){
                this.list.map((ele,idx,arr)=>{
                    //浅复制
                    arr[idx].checked = this.fullChecked;
                })
                this.list = JSON.parse(JSON.stringify(this.list))
                // 强制执行diff运算，然后强制update页面
                // this.$forceUpdate()
            },
            // 每一行是否勾选的变化
            rowChange(bol){
                console.log('rowchange',bol);
                // 每次发生行的勾选变量时，都要判断是否已经全选。那该怎么判断呢？
                // 思路：遍历this.list，查询被勾选的行的数量，是不是等于 this.list.length
                let arr = this.list.filter(ele=>ele.checked)
                if(arr && arr.length === this.list.length){
                    this.fullChecked = true;
                }else{
                    this.fullChecked = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.qf-cart {
  padding-bottom: 2.4rem;
  padding-top: 1.33rem;
  .goods-card {
    margin: 0;
    background-color: white;
  }
  .delete-button {
    height: 100%;
  }
  .van-button {
    padding: 0 .27rem;
  }
  .van-swipe-cell {
    background-color: white;
    border-bottom: 1px solid #eee;
  }
  .van-card {
    padding-left: 0;
  }
  .no-good {
    text-align: center;
    padding: .33rem 0;
    font-size: .43rem;
    color: #666666;
    &>img {
      display: inline-block;
      width: 6.67rem;
      height: 6.67rem;
    }
  }
}
</style>