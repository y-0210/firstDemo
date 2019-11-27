<template>
    <div id="app">
        <van-nav-bar title="VD科技" class="header">
            <van-icon name="arrow-left" slot="left" @click="goBack" v-show="flag"/>
            <span slot="right" @click="showtips" v-show="isshopcar">管理</span>
        </van-nav-bar>
        <div class="app-container">
            <transition :name="transitionName">
                <router-view class="position-div"/>
            </transition>
        </div>
        <van-tabbar route class="tabbar">
            <van-tabbar-item
                    replace
                    to="/home"
            >
                <span slot="icon" class="iconfont icon-shouye"></span>
                <span class="tab-label">首页</span>
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/member"
            >
                <span slot="icon" class="iconfont icon-huiyuan"></span>
                <span class="tab-label">会员</span>
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/shopcar"
            >
                <span slot="icon" class="iconfont icon-gouwu"><span id="badge" class="tab-badge">{{$store.getters.getAllCount}}</span></span>
                <span class="tab-label">购物车</span>
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/search"
            >
                <span slot="icon" class="iconfont icon-chazhao"></span>
                <span class="tab-label">搜索</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {NavBar, Icon, Tabbar, TabbarItem, Dialog} from 'vant';

    Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Icon).use(Dialog);
    export default {
        data() {
            return {
                flag: false,
                isshopcar: false,
                transitionName: ''
            }
        },
        created() {
            this.flag = this.$route.path === '/home' ? false : true;
            this.isshopcar = this.$route.path === '/shopcar' ? true : false;
        },
        components: {},
        methods: {
            goBack() {
                this.$router.go(-1);

            },
            showtips(){
              this.$dialog.alert({
                message: '向左滑动商品卡片删除商品'
              });
          }
        },
        watch: {
            '$route.path': function (newVal) {
                if (newVal === '/home') {
                    this.flag = false;
                    this.isshopcar = false
                } else if (newVal === '/shopcar') {
                    this.isshopcar = true;
                    this.flag = true;
                } else {
                    this.flag = true;
                    this.isshopcar = false
                }

            },
            $route(to, from) {
                if (to.meta > from.meta) {
                    this.transitionName = "slide-left"
                } else {
                    this.transitionName = "slide-right"
                }
            }

        }
    };
</script>
<style lang="scss">
    html,body,#app{
        height: 100%;
        width: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: linear-gradient(to right,#ffd01e,#ff6034);

        .van-nav-bar__title, .van-icon, span {
            color: #fff;
        }
    }

    .app-container {
        position: relative;
        color: #2c3e50;
        background: #fafafa;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        .position-div {
            position: absolute;
            left: 0;
            right: 0;
            top: 46px;
            margin-bottom: 60px;
        }
    }


    .tabbar {
        -webkit-box-shadow: 0 -1px 3px rgba(0, 0, 0, .1);
        box-shadow: 0 -1px 3px rgba(0, 0, 0, .1);

        .van-tabbar-item__icon {
            font-size: 24px;
            position: relative;
            z-index: 20;
            top: 3px;
            width: 24px;
            height: 24px;
            padding-top: 0;
            padding-bottom: 0;
            line-height: 1;
            display: inline-block;
            text-decoration: none;

            .iconfont {
                font-size: 24px;
            }
        }

        .tab-label {
            font-size: 11px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }


        .tab-badge {
            position: absolute;
            top: -3px;
            right: -8px;
            font-size: 12px;
            line-height: 1;
            display: inline-block;
            padding: 3px 6px;
            color: #fff;
            border-radius: 100px;
            background-color: #ff5053;
        }

        .van-tabbar-item--active {
            color: #ff6034;
        }


    }

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: all 300ms;
    }

    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .slide-right-leave-to {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-to {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

</style>
