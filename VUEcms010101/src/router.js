import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Member from './views/Member'
import Shopcar from './views/Shopcar'
import Search from './views/Search'
import NewsList from './views/news/NewsList'
import NewsInfo from './views/news/NewsInfo'
import PhotoList from "./views/photos/PhotoList"
import PhotoInfo from "./views/photos/PhotoInfo"
import GoodsList from "./views/goods/GoodsList"
import GoodsInfo from "./views/goods/GoodsInfo"
import GoodsDesc from "./views/goods/GoodsDesc";
import GoodsComment from "./views/goods/GoodsComment";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: Home ,meta:1},
    {path: '/about', name: 'about', component: () => import('./views/About.vue')},
    {path: '/member', name: 'member', component: Member,meta:2},
    {path: '/shopcar', name: 'shopcar', component: Shopcar,meta:3},
    {path: '/search', name: 'search', component: Search,meta:4},
    {path: '/home/newslist', name: 'newslist', component: NewsList,meta:2},
    {path: '/home/newsinfo/:id', name: 'newsinfo', component: NewsInfo,meta:3},
    {path: '/home/photolist', name: 'photolist', component: PhotoList,meta:4},
    {path: '/home/photoinfo/:id', name: 'photoinfo', component: PhotoInfo,meta:5},
    {path: '/home/goodslist', name: 'goodslist', component: GoodsList,meta:6},
    {path: '/home/goodsinfo/:id', name: 'goodsinfo', component: GoodsInfo,meta:7},
    {path: '/home/goodsdesc/:id', name: 'goodsdesc', component: GoodsDesc,meta:8},
    {path: '/home/goodscomment/:id', name: 'goodscomment', component: GoodsComment,meta:9}
  ],
  linkActiveClass: 'tabbar-item--active'
})
