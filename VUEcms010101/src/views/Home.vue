<template>
    <div class="home">

        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <van-grid :border="false" :column-num="3">
            <van-grid-item>
                <router-link to="/home/newslist">
                    <img src="../assets/menu1.png">
                    <div class="item-title">资讯头条</div>
                </router-link>
            </van-grid-item>
            <van-grid-item>
                <router-link to="/home/photolist">
                    <img src="../assets/menu2.png">
                    <div class="item-title">产品秀</div>
                </router-link>
            </van-grid-item>
            <van-grid-item>
                <router-link to="/home/goodslist">
                    <img src="../assets/menu3.png">
                    <div class="item-title">商品购买</div>
                </router-link>
            </van-grid-item>
            <van-grid-item>
                <router-link to="/home/goodslist">
                    <img src="../assets/menu4.png">
                    <div class="item-title">留言反馈</div>
                </router-link>
            </van-grid-item>
            <van-grid-item>
                <router-link to="/home/goodslist">
                    <img src="../assets/menu5.png">
                    <div class="item-title">视频专区</div>
                </router-link>
            </van-grid-item>
            <van-grid-item>
                <router-link to="/about">
                    <img src="../assets/menu6.png">
                    <div class="item-title">联系我们</div>
                </router-link>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import swiper from "../components/swiper";
    import Vue from 'vue';
    import {Grid, GridItem, Toast} from 'vant';

    Vue.use(Grid).use(GridItem).use(Toast);

    export default {
        name: 'home',
        components: {swiper},
        data() {
            return {
                lunbotuList: []
            }
        },
        created() {
            this.getLunbo();
        },
        methods: {
            getLunbo() {
                this.axios.get('api/getlunbo').then(response => {
                    if (response.data.status === 0) {
                        this.lunbotuList = response.data.message;
                    } else {
                        Toast("加载轮播图失败");
                    }
                })

            }

        }
    }
</script>
<style lang="scss" scoped>
    .home {
        .van-grid {
            background: #fff;

            .van-grid-item {
                img {
                    height: 60px;
                    width: 60px;
                }

                .item-title {
                    text-align: center;
                    font-size: 13px;
                    color: #242424;
                }

            }
        }
    }

</style>