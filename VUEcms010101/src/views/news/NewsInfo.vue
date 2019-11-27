<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击： {{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content">

        </div>
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Toast } from 'vant';
    Vue.use(Toast);
    import comment from "../../components/comment";
    export default {
        name: "newsinfo",
        data() {
            return {
                id: this.$route.params.id,
                newsinfo:{}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                this.axios.get('api/getnew/' + this.id).then(result =>{
                    if(result.data.status === 0){
                        this.newsinfo = result.data.message[0]

                    }else {
                        Toast("获取新闻内容失败");
                    }
                })
            }
        },
        components:{
            comment
        }

    }
</script>

<style lang="scss">
    .newsinfo-container {
        width: 100%;
        background-color: #fff;

        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 6px;
        }

        .subtitle {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #666;
            padding: 0 6px;
        }

        .content {
            padding: 0 6px;
            img{
                width: 100%;
            }
        }
    }

</style>