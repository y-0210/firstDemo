<template>
    <div class="news">
        <ul class="newslist">
            <router-link v-for="item in newslist" :key="item.id" :to="'/home/newsinfo/' + item.id">
                <li class="newsitem">
                    <div class="imgcov">
                        <img :src="item.img_url" alt="图片加载失败">
                    </div>
                    <div class="infobox">
                        <h1>{{item.title}}</h1>
                        <div class="info">
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>点击次数：{{item.click}}</span>
                        </div>
                    </div>
                </li>
            </router-link>

        </ul>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {Toast} from 'vant';

    Vue.use(Toast);
    export default {
        name: "NewsList",
        data() {
            return {
                newslist: []
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            getNewsList() {
                this.axios.get('api/getnewslist').then(response => {
                    if (response.data.status === 0) {
                        this.newslist = response.data.message;
                    } else {
                        Toast("获取新闻列表失败");
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news {
        .newslist{
            list-style: none;
            padding: 10px 5px;
            .newsitem {
                border-bottom: 1px solid #efeff4;
                display: flex;
                justify-content: space-between;
                padding:15px 5px;
                background-color: #fff;

                .imgcov {
                    width: 90px;
                    height: 60px;
                    border-radius: 5px;
                    overflow: hidden;

                    img {
                        width: 90px;
                        height: 60px;
                    }
                }
                .infobox{
                    width: 100%;
                    padding-left: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    h1{ font-size: 14px; margin: 0; color: #000; font-weight: normal}
                    .info {
                        font-size: 12px;
                        color: #666;
                        display: flex;
                        justify-content: space-between;
                    }
                }


            }

        }


    }
</style>