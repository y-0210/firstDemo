<template>
  <div class="search">
    <form action="/">
      <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action

      />
    </form>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Search } from 'vant';

  Vue.use(Search);
  export default {
    name: "search",
    data() {
      return {
        value:''
      }
    },
    mounted() {},
    created() {},
    methods: {},
    components: {}
  }

</script>

<style lang="scss">
.search{
  .van-field__control {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 28px;
    outline: 0;
    margin: 0;
    background: transparent;
  }
}
</style>