<template>
    <div class="numbox">
        <van-stepper v-model="value" integer @change="CountChange" :max="max">
        </van-stepper>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Stepper} from 'vant';

    Vue.use(Stepper);

    export default {
        data() {
            return {
                value: 1,
            }
        },
        mounted() {//引入的是在mian.js所以加上this
            //mui('.mui-numbox').numbox();
        },
        props: [
            // eslint-disable-next-line vue/no-dupe-keys
            "max"
        ],
        methods: {
            CountChange() {//文本框数据被修改的时候
                this.$emit('getcount', parseInt(this.value));

            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    .numbox{display: inline-block}
</style>