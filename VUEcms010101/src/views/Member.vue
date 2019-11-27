<template>
    <div class="member">
        <div class="top">
            <div class="usercon">
                <div class="imgcover">
                    <img src="https://iconfont.alicdn.com/t/1550728574104.jpg@100h_100w.jpg" alt="">
                </div>
                <div class="userinfo">
                    <h1>Vasyl Dong</h1>
                    <p>这个用户很懒一句话也没有留下</p>
                </div>
            </div>
          <div class="panel userpanel">
            <div class="panelitem">
              <div class="item-num">111</div>
              <div class="item-title">收藏夹</div>
            </div>
            <div class="panelitem">
              <div class="item-num">111</div>
              <div class="item-title">关注</div>
            </div>
            <div class="panelitem">
              <div class="item-num">111</div>
              <div class="item-title">足迹</div>
            </div>
            <div class="panelitem">
              <div class="item-num">111</div>
              <div class="item-title">红包</div>
            </div>
          </div>
        </div>
      <div class="card">
        <div class="card-header"><span>我的订单</span><span></span></div>
        <div class="card-content">
          <div class="panel cardpanel">
            <div class="panelitem">
              <div class="item-icon"><van-icon name="pending-payment" /></div>
              <div class="item-title">待付款</div>
            </div>
            <div class="panelitem">
              <div class="item-icon"><van-icon name="send-gift-o" /></div>
              <div class="item-title">待发货</div>
            </div>
            <div class="panelitem">
              <div class="item-icon"><van-icon name="logistics" /></div>
              <div class="item-title">待收货</div>
            </div>
            <div class="panelitem">
              <div class="item-icon"><van-icon name="comment-o" /></div>
              <div class="item-title">评论</div>
            </div>
            <div class="panelitem">
              <div class="item-icon"><van-icon name="refund-o" /></div>
              <div class="item-title">售后</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Field, Toast, Icon} from 'vant';

    Vue.use(Field).use(Toast).use(Icon);

    export default {
        name: "member",
        data() {
            return {}
        },
        mounted() {
        },
        created() {
        },
        methods: {},
        components: {}
    }

</script>

<style lang="scss">
  .member{
    .top {
      background: linear-gradient(to right, #ffd01e, #ff6034);
      margin-bottom: 10px;

      .usercon {
        padding: 10px 5px;
        display: flex;

        .imgcover {
          margin-left: 5px;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid #fff;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }

      .userinfo {
        padding-left: 20px;
        h1{font-size: 16px;color: #fff; margin: 0; line-height: 32px;}
        p{font-size: 13px; color:#fff; margin: 0; line-height: 20px}
      }
      .userpanel{
        padding: 10px;
        .panelitem{
          color: #fff;
          width: 25%;
          .item-num{font-size: 13px;}
          .item-title{font-size: 13px;}
        }
      }
    }
    .panel{
      display: flex;
      justify-content: space-between;
      .panelitem{
        text-align: center;
      }
    }

    .card {
      font-size: 14px;
      position: relative;
      overflow: hidden;
      margin: 10px;
      border-radius: 5px;
      background-color: white;
      background-clip: padding-box;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .1);

      .card-header, .card-footer {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .card-header {
        font-size: 14px;
        border-radius: 2px 2px 0 0;
        border-bottom:1px solid #eeeeee;
        span{ font-weight: bold}
      }
      .card-footer {
        color: #6d6d72;
        border-radius: 0 0 2px 2px;
        border-top:1px solid #c7c7cc;
      }

      .card-content {
        font-size: 14px;
        position: relative;
        display: block;
        padding: 5px;
        .cardpanel{
          .panelitem{
            width: 18%;
            .item-icon{font-size: 25px;
              i{
                color:  #ff6034;
              }


            }
            .item-title{font-size: 13px; color: #323232}
          }
        }
      }


    }
  }

</style>