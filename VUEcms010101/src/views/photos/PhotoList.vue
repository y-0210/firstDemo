<template>
    <div>
        <!--顶部滚动导航条-->
        <van-tabs v-model="selectedId" color="#ff6034">
            <van-tab
                    v-for="item in tabitems"
                    :title="item.title"
                    :key="item.id"
                    :name="item.id"
            >
            </van-tab>
        </van-tabs>
        <ul class="photolist">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
                <img :src="item.img_url" alt="">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import Vue from 'vue';
    import {Tab, Tabs} from 'vant';

    Vue.use(Tab).use(Tabs);
    export default {
        name: "PhotoList",
        data() {
            return {
                selectedId: 0,
                tabitems: [
                    {title: "全部", id: 0}
                ],
                list: [],
            }
        },
        mounted() {
        },
        created() {
            this.getAllCategory();
            this.getPhotolistByCateId(0)
        },
        methods: {
            getAllCategory() {
                this.axios.get("/api/getimgcategory/").then(result => {
                    if (result.data.status === 0) {
                        this.tabitems = this.tabitems.concat(result.data.message)
                    }

                })
            },
            getPhotolistByCateId(cateId) {
                this.axios.get("/api/getimages/" + cateId)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.list = result.data.message;
                            this.selectedId = cateId
                        }

                    })
            },
        }, components: {},
        watch: {
            selectedId: function (newVal) {
                this.getPhotolistByCateId(newVal)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .photolist {
        list-style: none;
        margin: 0;
        padding: 10px 10px 0;

        li {
            display: block;
            position: relative;
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;

            img {
                width: 100%;
                display: block;

            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                position: absolute;
                bottom: 0;
                max-height: 84px;
                background-color: rgba(0, 0, 0, .4);
                color: #fff;
                text-align: left;
                padding: 0 5px;
                overflow: hidden;

                .info-title {
                    font-size: 14px;
                    margin: 0;
                    line-height: 28px;
                }

                .info-body {
                    font-size: 14px;
                }
            }
        }
    }


</style>