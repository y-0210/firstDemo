<template>
    <div class="goodsinfo">
        <div class="shop-card">
            <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
        <div class="shop-card">
            <div class="card-header">{{goodsinfo.title}}</div>
            <div class="card-content">
                    <p class="price">
                        市场价：
                        <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量：
                        <numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                <div class="btnbox">

                    <van-goods-action-button type="warning" @click="addToShopCar()" text="加入购物车"/>
                    <van-goods-action-button type="danger" @click="asshow = true" text="立即购买"/>
                </div>
            </div>
        </div>
        <div class="shop-card">
            <div class="card-header">商品参数</div>
            <div class="card-content">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
            </div>
            <div class="card-footer gm">
                <van-button type="info" size="large" plain @click="goDesc(id)">图文介绍</van-button>

                <van-button type="danger" size="large" plain @click="goComment(id)">商品评论</van-button>
            </div>
        </div>
        <van-action-sheet
                v-model="asshow"
                :actions="actions"
                cancel-text="取消"
                @cancel="onCancel"
        />

    </div>
</template>

<script>
    import swiper from "../../components/swiper";
    import goodsinfo_numberbox from "../../components/goodsinfo_numberbox";
    import Vue from 'vue';
    import {
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton,
        Button,
        Toast,
        ActionSheet
    } from 'vant';

    Vue
        .use(GoodsAction)
        .use(GoodsActionIcon)
        .use(GoodsActionButton)
        .use(Button)
        .use(Toast)
        .use(ActionSheet);

    export default {
        name: "GoodsInfo",
        data() {
            return {
                id: this.$route.params.id,
                selectCount: 1,
                lunbotu: [],
                goodsinfo: [],
                asshow: false,
                actions: [
                    {name: '确认订单信息', color: '#ff8917'},
                    {loading: true},
                    {name: '提交订单中请稍后', color: '#666'}
                ]

            }
        },
        created() {
            this.getLunbo();
            this.getGoodsInfo()
        },
        components: {
            swiper,
            numbox: goodsinfo_numberbox
        },
        methods: {
            getLunbo() {
                this.axios.get('api/getthumimages/' + this.id).then(result => {
                    if (result.data.status === 0) {
                        //循环每个图片数据 补全图片的宽和高 msrc
                        result.data.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotu = result.data.message
                    }
                })
            },
            getGoodsInfo() {
                this.axios.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.data.status === 0) {
                        this.goodsinfo = result.data.message[0]
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: "goodsdesc", params: {id}});
            },

            goComment(id) {
                this.$router.push({name: "goodscomment", params: {id}});
            },
            addToShopCar() {
                //拼接出要保存到 store 的商品信息
                var goodsinfo = {
                    id: parseInt(this.id),
                    count: this.selectCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                };
                this.$store.commit('AddToCar', goodsinfo);
                Toast.success('已加入购物车');

            },
            getSelectCount(count) {
                this.selectCount = count;
            },
            onCancel() {
                this.asshow = false
            }

        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo {
        background-color: #eee;
        overflow: hidden;

        .shop-card {
            font-size: 14px;
            position: relative;
            overflow: hidden;
            margin: 10px;
            border-radius: 2px;
            background-color: white;
            background-clip: padding-box;
            -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
            box-shadow: 0 1px 2px rgba(0, 0, 0, .3);

            .card-header, .card-footer {
                position: relative;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                min-height: 44px;
                padding: 10px 15px;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .card-header {
                font-size: 17px;
                border-radius: 2px 2px 0 0;
                border-bottom:1px solid #c7c7cc;
            }
            .card-footer {
                color: #6d6d72;
                border-radius: 0 0 2px 2px;
                border-top:1px solid #c7c7cc;
            }

            .card-content {
                font-size: 14px;
                position: relative;
                display: block;
                padding: 15px;
                button {
                    margin-bottom: 10px;
                }
            }


        }

        .now_price {
            color: #ff5053;
            font-size: 16px;
            font-weight: bold;

        }

        .gm button {
            margin-right: 5px;
        }

        /*.ball{ position:absolute; z-index:99 ; top:380px; left:146px;width: 20px;height: 20px; border-radius: 10px; background: #ff5053; opacity: 1}*/
        .btnbox {
            display: flex;

        }
    }
</style>