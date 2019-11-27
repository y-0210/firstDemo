<template>
    <div class="numbox">
        <van-stepper v-model="value" integer @change="CountChange">
        </van-stepper>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {Stepper} from 'vant';

    Vue.use(Stepper);

    export default {
        data(){
          return{
              value:''
          }
        },
        mounted() {
        },
        created(){
            this.value =this.initcount
        },
        methods: {
            CountChange(value) {//文本框数据被修改的时候
                //console.log(value)
                //todo 这里需要限制最大数量
                this.$store.commit('UpdateGoodsInfo', {
                    id: this.goodsid,
                    count: parseInt(value)
                })


            }
        },
        props: ["initcount", "goodsid"],
        watch: {
            "initcount":function (newVal) {
                this.value =newVal
                //console.log(newVal)

            }
        }
    }
</script>

<style lang="scss">
    .numbox {
        height: 28px;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        background-color: #eeeeee;
        .van-stepper__minus, .van-stepper__plus{background-color: #fff;}
        input[type='number'] {
            height: 28px;
            padding: 0;
            margin: 0 1px;
            background-color: #fff;
            border-radius: 0;
            -webkit-appearance: none;
        }
    }
</style>