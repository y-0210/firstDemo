<template>
    <div class="goods-list">
        <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" :alt="item.title">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <van-button type="danger" size="large" @click="getMore()">加载更多</van-button>

    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';

    Vue.use(Button);
    export default {
        name: "GoodsList",
        data(){
            return{
                pageindex: 1,
                goodslist: []

            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                this.axios.get('api/getgoods?pageindex=' + this.pageindex).then(result =>{
                    if(result.data.status === 0){
                        this.goodslist = this.goodslist.concat(result.data.message);
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            },
            goDetail(id){
                  // this.$router.push('/home/goodsinfo/' + id)
                  this.$router.push({name:"goodsinfo" , params:{id}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goodsitem {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 49%;
            min-height: 293px;
            border-radius: 5px;
            -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
            margin-bottom: 7px;

            img {
                width: 100%;
                border-radius: 5px 5px 0 0;
            }

            .title {
                font-size: 14px;
                padding: 5px;
            }

            .info {
                border-radius: 0 0 3px 3px;
                p {
                    margin: 0;
                    padding: 5px;
                }

                background-color: #f6f6f6;
                margin: 2px;

                .price {
                    .now {
                        color: #ff5053;
                        font-weight: bold;
                        font-size: 14px;
                    }

                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;

                }
            }
        }
    }
</style>