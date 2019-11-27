<template>
    <div>
        <van-swipe :autoplay="4000">
            <van-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" :class="{full:isfull}" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'vant';

    Vue.use(Swipe).use(SwipeItem);

    export default {
        name: "swiper",
        props: ["lunbotuList","isfull"]
    }
</script>

<style lang="scss" scoped>
    .van-swipe {
        height: 200px;

        .van-swipe-item {
            text-align: center;
            img {
                height: 100%;
            }

        }
    }
    .full{
        width: 100%;
    }
</style>