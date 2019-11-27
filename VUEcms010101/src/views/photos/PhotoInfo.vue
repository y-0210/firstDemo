<template>
    <div class="photoinfo-container">
        <h3 class="title">{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
            <span>点击： {{photoinfo.click}}次</span>
        </p>
        <hr>
        <div class="thumbbox">
            <vue-preview :slides="list" ></vue-preview>
        </div>
        <div class="content" v-html="photoinfo.content">
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
        name: "photoinfo",
        data() {
            return {
                id: this.$route.params.id,
                photoinfo:[],
                list:[]

            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs()
        },
        methods:{
            getPhotoInfo(){
                this.axios.get('api/getimageInfo/' + this.id).then(result =>{
                    if(result.data.status === 0){
                        this.photoinfo = result.data.message[0]

                    }else {
                        Toast("获取图片内容失败");
                    }
                })
            },
            getThumbs(){
                this.axios.get('api/getthumimages/' + this.id).then(result =>{
                    if(result.data.status === 0){
                        //循环每个图片数据 补全图片的宽和高 msrc
                        result.data.message.forEach(item=>{
                            item.msrc = item.src;
                            item.w = 600;
                            item.h = 400;
                        });
                        this.list = result.data.message

                    }else {
                        Toast("获取图片内容失败");
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
    .photoinfo-container {
        padding: 3px;
        background-color: #fff;

        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 6px;
            color: #ff6034;
        }

        .subtitle {
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            color: #6d6d72;
            padding: 0 6px;
        }

        .content {
            padding: 0 6px;
            font-size: 13px;
            line-height: 26px;
            img{
                width: 100%;
            }
        }
        .thumbbox{
            .my-gallery{
                display: flex;
                flex-wrap:wrap;//默认换行
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 2px #999;
                        border-radius: 5px;
                    }
                }
            }
            .pswp {
                position: absolute;
                width: 100%;
                left: 0;
                top: 46px;
                bottom: 50px;
            }

        }

    }

</style>