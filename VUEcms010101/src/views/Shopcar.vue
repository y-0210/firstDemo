<template>
    <div class="shopcar">
        <div class="goodslist">
            <div class="shop-card" v-for="(item,i) in goodslist" :key="item.id">

                <van-swipe-cell>
                    <template slot="default">
                        <div class="card-content">

                            <div class="card-box">
                                <van-switch
                                        v-model="$store.getters.getGoodsSelected[item.id]"
                                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
                                        size="20px"
                                        active-color="#ff6034"
                                ></van-switch>
                            </div>
                            <div>
                                <img :src="item.thumb_path" alt="图片加载失败！">
                            </div>

                            <div class="info">
                                <h1>{{ item.title }}</h1>
                                <p class="box">
                                    <span class="price">￥{{ item.sell_price }}</span>
                                    <numbox :initcount="$store.getters.getGoodsCount[item.id]"
                                            :goodsid="item.id"></numbox>
                                </p>
                            </div>
                        </div>
                    </template>
                    <template slot="right">
                        <van-button square type="danger" @click.prevent="del(item.id, i)" text="删除"/>
                    </template>
                </van-swipe-cell>


            </div>
        </div>

        <div class="jiesuan">
            <div class="tips">
                已选中商品 <span class="red">{{ $store.getters.getGoodsCountAmount.count }}</span> 件
            </div>
            <div class="count">
                合计： <span class="red">￥{{$store.getters.getGoodsCountAmount.amount }}</span> 件
            </div>
            <van-button round color="linear-gradient(to right,#ff8917,#ff6034)" @click="asshow = true">结算</van-button>
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
    import numbox from "../components/shopcar_numberbox";
    import Vue from 'vue';
    import {SubmitBar, Switch, ActionSheet, SwipeCell, Cell, CellGroup} from 'vant';

    Vue.use(Cell)
        .use(CellGroup)
        .use(SwipeCell)
        .use(SubmitBar)
        .use(Switch)
        .use(ActionSheet);
    export default {
        name: "shopcar",
        data() {
            return {
                goodslist: [],
                asshow: false,
                actions: [
                    {name: '确认订单信息', color: '#ff8917'},
                    {loading: true},
                    {name: '提交订单中请稍后', color: '#666'}
                ]

            }
        },
        mounted() {
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                var idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                if (idArr.length <= 0) {
                    return;
                }
                this.axios.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result => {
                    if (result.data.status === 0) {
                        this.goodslist = result.data.message;
                    }
                })
            },
            del(id, index) {
                //点击删除，将商品从store中根据传递的ID 删除，同时 把当前组件中的goodslist中对应的数据根据index删除
                this.goodslist.splice(index, 1);

                this.$store.commit('RemoveFromCar', id)

            },
            selectedChanged(id, value) {
                this.$store.commit("UpdateGoodsSelected", {id, selected: value});
            },
            onCancel() {
                this.asshow = false
            }

        },
        components: {
            numbox
        }
    }


</script>

<style lang="scss">
    .shopcar {
        .goodslist {
            padding-bottom: 40px;

            .shop-card {
                font-size: 14px;
                position: relative;
                overflow: hidden;
                margin: 10px;
                border-radius: 5px;
                background-color: white;
                background-clip: padding-box;
                -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
                box-shadow: 0 1px 3px rgba(0, 0, 0, .1);

                .van-button--danger {
                    height: 100%;
                }
            }

            .card-content {
                position: relative;
                padding: 15px;
                display: flex;
                align-items: center;

                img {
                    width: 60px;
                    height: 60px;
                    margin: 0 5px;
                }

                h1 {
                    font-size: 13px;
                }

                .info {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    justify-content: space-between;

                    .box {
                        display: flex;
                        justify-content: space-between;
                        margin: 5px 0;
                        line-height: 28px;
                    }

                    .price {
                        color: #ff5053;
                        font-weight: bold;
                        margin-right: 5px;
                    }
                }
            }
        }

        .jiesuan {
            position: fixed;
            bottom: 51px;
            left: 0;
            right: 0;
            padding: 0 15px;
            height: 52px;
            background: #fff;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #efeff4;

            .tips {
                width: 35%;
                line-height: 52px;
                font-size: 13px;
                color: #666;
            }

            .count {
                width: 35%;
                line-height: 52px;
                text-align: right;
            }

            .red {
                color: #ff5053;
                font-weight: bold;
            }

            .van-button {
                width: 25%;
                padding: 0 25px;
                font-size: 16px;
                margin-top: 5px;
            }
        }


    }

</style>
