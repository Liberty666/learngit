import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { Tabbar, TabbarItem, Icon, 
CellGroup,Button,Toast,Dialog,NavBar,IndexBar, IndexAnchor,Cell,Area,swipe,SwipeItem,Divider,Rate   } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Icon).use(CellGroup).use(Button).use(Toast).use(Dialog).use(NavBar).use(IndexBar).use(IndexAnchor).use(Cell).use(Area).use(swipe).use(SwipeItem).use(Divider).use(Rate);

import "@/vue-init.js";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
