<template>
    <div id="app">

        <van-tabbar
            v-model="active"
            :route="true"
            
        >
            <van-tabbar-item 
                icon="home-o"
                to="/"
            >
                <span>首页</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.homeH : icon.home"
                >
            </van-tabbar-item>
            <van-tabbar-item 
                icon="search"
                to="/find"
            >
                <span>发现</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.findH : icon.find"
                >
            </van-tabbar-item>
            <van-tabbar-item 
                icon="friends-o"
                to="/order"
            >
                <span>订单</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.orderH : icon.order"
                >
            </van-tabbar-item>
            <van-tabbar-item 
                icon="setting-o"
                to="/me"
            >
                <span>我的</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.meH : icon.me"
                >
            </van-tabbar-item>
        </van-tabbar>

        <transition :name="aniType">
            <keep-alive>
                <router-view :class="routerViewClassObj"/>
            </keep-alive>
        </transition>
        
        

    </div>
</template>

<script>

    import home from "@/assets/icons/home.png";
    import homeH from "@/assets/icons/home-h.png";
    import find from "@/assets/icons/find.png";
    import findH from "@/assets/icons/find-h.png";
    import order from "@/assets/icons/order.png";
    import orderH from "@/assets/icons/order-h.png";
    import me from "@/assets/icons/me.png";
    import meH from "@/assets/icons/me-h.png";

    export default {
        data(){
            return {
                active:0,
                icon:{
                    home,
                    homeH,
                    find,
                    findH,
                    order,
                    orderH,
                    me,
                    meH
                },

                showTabbar:true,

                aniType:""
            }
        },

        computed: {
            routerViewClassObj(){
                return {
                    "page-root":this.showTabbar,
                    "deep-page-root":!this.showTabbar
                }
            }
        },  

        methods: {
            initRouteGuard(){
                // 监听路由跳转
                this.$router.beforeEach((to,from,cb)=>{
                    let toDeep = to.path.split("/").length-1;
                    let fromDeep = from.path.split("/").length-1;

                    if(toDeep>fromDeep){
                        this.aniType = "push";
                    }else if(toDeep<fromDeep){
                        this.aniType = "pop";
                    }else{
                        this.aniType = "";
                    }

                    this.showTabbar = toDeep==1;
                    
                    cb();
                });
            }
        },


        mounted() {
            this.initRouteGuard()

            setTimeout(() => {
                let deep = this.$route.path.split("/").length-1;
                this.showTabbar = deep==1;
            }, 10);
            
                
            
            
            

        },
    }
</script>


<style>

    body{
        width: 100vw;
        overflow-x: hidden;
    }

    .page-root{
        height: calc(100vh - 50px);
        background-color: #f6f6f6;
        overflow-y: scroll;

    }

    .deep-page-root{
        height: 100vh;
        background-color: #f6f6f6;
        overflow-y: scroll;
        position: relative;

        z-index: 1000;
    }


    .push-enter,.pop-leave-to{
        left: 100%;
    }

    .push-enter-active,
    .push-leave-active,
    .pop-enter-active,
    .pop-leave-active{
        transition: all 0.7s;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .pop-leave-active{
        z-index: 10;
    }

    .push-enter-to,.push-leave,.pop-enter-to,.pop-leave{
        left: 0;
    }

    .push-leave-to,.pop-enter{
        left: -50%;
    }


    


</style>