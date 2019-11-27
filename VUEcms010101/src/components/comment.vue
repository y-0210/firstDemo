<template>
    <div class="comment-box">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
        <van-button type="info" size="large" @click="postComment()">发表评论</van-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="i">
                <div class="cmt-title">第 {{i+1}} 楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time |
                    dateFormat}}
                </div>
                <div class="cmt-body">{{item.content === 'undefined' ? '此用户很懒什么都没说' : item.content}}</div>
            </div>
        </div>
        <van-button type="danger" size="large" @click="getMore()">加载评论</van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button,Toast } from 'vant';

    Vue.use(Button).use(Toast);

    export default {
        name: "comment",
        data() {
            return {
                pageIndex: 1,
                comments: [],
                msg: ""
            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                this.axios.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                    .then(result => {
                        if (result.data.status === 0) {
                            //this.comments = result.data.message;
                            this.comments = this.comments.concat(result.data.message);
                        } else {
                            Toast("获取评论失败")
                        }
                    })
            },
            getMore() {
                this.pageIndex++;
                this.getComments();

            },
            postComment(){//提交评论
                //先判断评论内容是否为空
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不能为空");
                }
                // 提交评论 接口中要求有3个参数
                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3： post定义提交时候，表单中数据的格式  { emulateJSON:true } 一般在main.js中设置为全局，省得每次都手写
                // 使用axios的设置方法：axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
                // 注意！！使用http://www.liulongbin.top:3005接口不需要指定参数3 否则不能发送评论内容 这是一个坑
                this.$http.post("api/postcomment/" + this.$route.params.id, {
                    content: this.msg.trim()})
                    .then(result => {
                        if(result.data.status === 0){
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = "";
                        }else{
                            Toast("提交评论失败")
                        }
                    })
            }
        },
        props: ['id']
    }
</script>

<style lang="scss">
    .comment-box {
        padding: 5px;
        h3 {
            font-size: 18px;
        }

        textarea {
            font-size: 14px;
            height: 85px;
            width: 96%;
            margin-left:1%;
        }

        .cmt-list {
            margin: 5px 0;

            .cmt-item {
                font-size: 13px;

                .cmt-title {
                    background-color: #ccc;
                }

                .cmt-body {
                    line-height: 35px;
                    text-indent: 20px;

                }
            }
        }
    }
</style>