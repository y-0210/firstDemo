import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//初始化数据 localStorage中有则读取本地数据
var car = JSON.parse(localStorage.getItem('car') || '[]');

export default new Vuex.Store({
  state: {
    car: car,//购物车商品数据 {id:商品id, count:购买数量, price:商品单价, selected:false }
    count:0

  },
  mutations: {
    AddToCar(state, goodsinfo){//添加购物车
      var flag = false;
      state.car.some( item => {
        if(item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      });


      if(!flag){
        state.car.push(goodsinfo)
      }

      //本地存储购物车信息
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    UpdateGoodsInfo(state, goodsinfo){//修改购物车
      state.car.some(item =>{
        if(item.id === goodsinfo.id){
          item.count = parseInt(goodsinfo.count);
          return true
        }
      });
      //修改完购物车数据本地化
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    RemoveFromCar(state, id){
      //根据id 删除
      state.car.some((item, i) =>{
        if (item.id === id){
          state.car.splice(i, 1);
          return true;

        }
      });
      //删除完购物车数据本地化
      localStorage.setItem('car',JSON.stringify(state.car))

    },
    UpdateGoodsSelected(state, info){
      state.car.some(item=>{
        if (item.id ===info.id){
          item.selected = info.selected
        }
      });
      localStorage.setItem('car',JSON.stringify(state.car))

    }

  },
  getters: {
    getAllCount(state){
      var c = 0;
      state.car.forEach(item =>{
        c += item.count
      });
      return c

    },
    getGoodsCount(state){
      var o = {};
      state.car.forEach(item =>{
        o[item.id] = item.count
      });
      return o

    },
    getGoodsSelected(state){
      var o = {};
      state.car.forEach(item =>{
        o[item.id] = item.selected
      });
      return o

    },
    getGoodsCountAmount(state){
      var o ={
        count:0, //勾选数量
        amount:0 //勾选商品总价
      };
      state.car.forEach(item =>{
        if (item.selected){
          o.count += item.count; //选中加入总数
          o.amount += item.count * item.price;
        }
      });
      return o;
    }


  },
  actions: {

  }
})
