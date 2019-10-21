<template>
  <div class="home" onscroll="onscroll" >
    <div class="backTop" v-model="backBtn" > 
      <img class="backTop-img" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOCAxMSkiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMi4yMzkiIHdpZHRoPSI5OC41MjIiIGhlaWdodD0iOC45MTciIHJ4PSI0LjQ1OCIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDkwIDUxLjUgNjIuNDE3KSIgeD0iNi43MTciIHk9IjU3Ljk1OCIgd2lkdGg9Ijg5LjU2NSIgaGVpZ2h0PSI4LjkxNyIgcng9IjQuNDU4Ii8+PHJlY3QgdHJhbnNmb3JtPSJzY2FsZSgtMSAxKSByb3RhdGUoNDUgMCAtMjUuNzU3KSIgeD0iLTYuNjcxIiB5PSI0MC4xNzEiIHdpZHRoPSI3MS42NTIiIGhlaWdodD0iOC45MTciIHJ4PSI0LjQ1OCIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDQ1IDczLjkzOCA0NC42MykiIHg9IjM4LjExMiIgeT0iNDAuMTcxIiB3aWR0aD0iNzEuNjUyIiBoZWlnaHQ9IjguOTE3IiByeD0iNC40NTgiLz48L2c+PC9zdmc+" alt="">
    </div>
    <div class="header">
      <div class="pos" @click="msite">
        <van-icon name="location" />
        <span class="location">{{place?place:'正在识别地址...'}}</span>
        <span class="bottom">
          <van-icon :name="bottom" size="6vw" />
        </span>
      </div>
    </div>
    <div class="search">
      <a class="content">
        <van-icon name="search" />
        <span>搜索饿了么商家、商品名称</span>
      </a>
    </div>
    <div v-if="!locLogin">
      <div class="nologin">
        <img src="../assets/no-address.gif" />
        <p class="nologin-pos">输入地址后才能订餐哦！</p>
        <van-button type="primary" @click="$router.push('/msite')">手动选择地址</van-button>
      </div>
    </div>

    <div v-else>
      <div class="about">
        <van-swipe
          :autoplay="3000"
          @change="onChange"
          :show-indicators="false"
          class="slide"
          indicator-color="#fe7100"
        >
          <van-swipe-item>
            <div class="first">
              <a class="jump" v-for="s in slide.slice(0,10)" :key="s.position" :href="s.link">
                <div class="slide-list">
                  <img class="slide-list-img" :src="s.image_hash|substr" />
                </div>
                <span class="slide-list-cont">{{s.name}}</span>
              </a>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="first">
              <a class="jump" v-for="s in slide.slice(10,20)" :key="s.position" :href="s.link">
                <div class="slide-list">
                  <img class="slide-list-img" :src="s.image_hash|substr" />
                </div>
                <span class="slide-list-cont">{{s.name}}</span>
              </a>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="dot">
          <div :class="index?'dot-active-not':'dot-active'" class="dot-first"></div>
          <div :class="index?'dot-active':'dot-active-not'" class="dot-second"></div>
        </div>
      </div>

      <div>
        <div class="link">
          <section class="activity">
            <div class="activity-color">
              <div class="activity-index">
                <h3 class="good">品质套餐</h3>
                <div class="each">搭配齐全吃得好</div>
                <div class="shopping">立即抢购 ></div>
                <img
                  class="img"
                  src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/resize,w_282,h_188,m_fixed"
                />
              </div>
            </div>
          </section>
          <div class="vip">
            <div>
              <img src alt />
              <span>超级会员</span>
              <span>
                <b>•已过期1天</b>•共为我节省46元
              </span>
            </div>
            <a href>
              <b>立即续费</b>
            </a>
          </div>
        </div>
      </div>

      <van-divider class="divider">推荐商家</van-divider>

      <div class="home-filter">
        <div class="filter">
          <div class="filter-header">
            <a href class="filter-nav">
              <span>综合排序</span>
              <van-icon name="play" class="rotate" size="2.5vw" />
            </a>
            <a href class="filter-nav">
              <span>距离最近</span>
            </a>
            <a href class="filter-nav">
              <span>品质联盟</span>
            </a>
            <a href class="filter-nav">
              <span>筛选</span>
              <van-icon name="filter-o" />
            </a>
          </div>
        </div>
      </div>

      <div class="nodata" v-if="!shopData">
        <img src="../assets/no-login.png" class="nodata-img" />
        <h3 class="nodata-result">没有结果</h3>
        <p class="nodata-shop">登录后查看更多商家</p>
        <button class="nodata-login" @click="$router.push('/me/login')">登录</button>
      </div>

      <div v-else class="shoplist">
        <section v-for="s,i in shopArr" :key="i" class="shoplist-item" @click="gotoDetail">
          <div class="shoplist-item-top">
            <div class="shoplist-item-top-left">
              <div class="shoplist-item-top-left-img">
                <img :src="s.restaurant.image_path|img" class="shoplist-item-img" />
              </div>
            </div>
            <div class="shoplist-item-top-right">
              <div class="shoplist-item-top-right-first">
                <h3 class="h3">{{s.restaurant.name}}</h3>
                <ul class="ul">
                  <span class="span">...</span>
                </ul>
              </div>
              <div class="shoplist-item-top-right-second">
                <div class="star">
                  <van-rate
                    v-model="s.restaurant.rating"
                    class="star-score"
                    size="3vw"
                    allow-half
                    readonly
                  />
                  <span class="score">{{s.restaurant.rating}}</span>
                  <span class="moon-shop">月售{{s.restaurant.recent_order_num}}单</span>
                </div>
                <div class="fengniao"></div>
              </div>
              <div class="shoplist-item-top-right-third">
                <div class="send">
                  <span class="send-begin">￥{{s.restaurant.piecewise_agent_fee.rules[0].price}}起送</span>
                  <span class="send-money">{{s.restaurant.piecewise_agent_fee.tips}}</span>
                </div>
                <div class="distance">
                  <span class="km">{{s.restaurant.distance|km}}</span>|
                  <span class="min">{{s.restaurant.order_lead_time}}分钟</span>
                </div>
              </div>
            </div>
          </div>
          <div class="shoplist-item-bottom">
            <div class="bottom-first">
              <span v-for="m in s.restaurant.support_tags" class="mini" :key="m.text">{{m.text}}</span>
            </div>
            <span>
              <img
                class="null"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgLjI1TDI4MCAwIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjEiLz48L3N2Zz4="
              />
            </span>
            <div class="bottom-end">
              <div class="bottom-end-left" :class="active?'':'none'">
                <div v-for="n in s.restaurant.activities" class="bottom-end-left-item" :key="n.icon_name">
                  <span  class="block" :style="n.icon_color|background">{{n.icon_name}}</span>
                  <span class="warp">{{n.tips}}</span>
                </div>
                <div v-for="u in s.restaurant.supports" class="bottom-end-left-item" :key="u.icon_name">
                  <span class="block" :style="u.icon_color|background">{{u.icon_name}}</span>
                  <span class="warp">{{u.description}}</span>
                </div>
              </div>
              <div class="bottom-end-right" @click="active=!active">
                <span
                  class="acvitive"
                >{{s.restaurant.activities.length+s.restaurant.supports.length}}个活动</span>
                <van-icon name="play" class="rotate" size="2.5vw" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>




<script>
import bottom2 from "@/assets/bottom2.png";
import bottom from "@/assets/bottom.png";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      bottom,
      // place:"正在识别地址...",
      locating: false,
      slide: [],
      index: 0,
      locLogin: true,
      shopData: true,
      userId:null,
      shopArr: [],
      active:false,
      // backBtn:true,
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.changelatitude(pos.coords.latitude);
      this.changelongitude(pos.coords.longitude);
      this.getPlace({
        latitude: this.latitude,
        longitude: this.longitude
      }).then(res => {
        this.changePlace(res.data.name);
        this.changeCity(res.data.city);
      });
    }),
      err => {
        if (!this.place) {
          this.$router.push("/msite");
        }
      },
      {
        timeout: 4000
      };
  },
  activated() {
    if (!this.latitude && !this.longitude) {
      this.true = false;
    }

    this.querySlideshow({
      latitude: this.latitude,
      longitude: this.longitude,
      templates: ["main_template", "favourable_template", "svip_template"],
      terminal: "h5"
    }).then(res => {
      this.slide = res.data[0].entries;
    });


    this.isLogin().then(res=>{
      // console.log(res.data);
      this.userId = res.data.user_id;
      console.log(this.userId);
    });

    this.getData();
  },
  methods: {
    getData(){
      this.queryData({
      latitude: this.latitude,
      longitude: this.longitude,
      offset: this.shopArr.length,
      limit: 8,
      extras: ["activities", "tags"],
      extra_filters: "home",
      rank_id: "",
      terminal: "h5"
    })
      .then(res => {
        console.log(res.data.items);
        this.shopData = true;
        this.shopArr = this.shopArr.concat(res.data.items);
      })
      .catch(err => {
        console.log(err);
        this.shopData = false;
      });
    },
    onscroll(){
      if(this.$el.scrollHeight - this.$el.scrollTop == this.$el.clientHeight){
        this.getData();
      }
    },
    onChange(e) {
      this.index = e;
    },
    msite() {
      this.$router.push("/msite");
    },
    backBtn(){
      if(this.$el.scrollTop>=100){
        console.log(this.$el.scrollTop)
        this.style="display:block"
      }
    },
    gotoDetail(){
      this.$router.push("./detail")
    },
    ...mapActions(["getPlace", "querySlideshow", "queryData","isLogin"]),
    ...mapMutations([
      "changePlace",
      "changelatitude",
      "changelongitude",
      "changeCity"
    ])
  },
  computed: {
    ...mapState(["place", "latitude", "longitude", "city"]),
    
  }
};
</script>

<style scoped>
.home {
  background: #fff;
}
.backTop{
  width: 11.33vw;
  height: 11.33vw;
  border: solid 0.13vw #999;
  background-color: #fff;
  position: fixed;
  bottom: 20vw;
  right: 4vw;
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 1005;
  transition: opacity 0.3s;
  will-change: transform;
}
.backTop-img{
  width: 5.33vw;
  height: 5.33vw;
}
.header {
  padding: 2.6vw 3.7vw 0;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  color: #fff;
}

.pos {
  height: 9.2vw;
  font-family: "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular,
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-weight: 700;
  /* width: 60%; */
  cursor: pointer;
}

.location {
  margin: 0 1.3vw;
  font-size: 4.6vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search {
  background-image: linear-gradient(90deg, #0af, #0085ff);
  position: sticky;
  z-index: 999;
  top: 0;
  padding: 2vw 3.73vw;
  margin: -0.13vw 0;
}

.search::before {
  top: -1px;
}

.search::after {
  bottom: -1px;
}

.search::before,
.search::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
}

.content {
  display: flex;
  width: 100%;
  height: 9.6vw;
  justify-content: center;
  align-items: center;
  border-radius: 0.267vw;
  background: #fff;
  color: #999;
  font-size: 3.74vw;
  font-family: simsu;
}

.bottom {
  position: relative;
  top: 1.3vw;
}

.slide {
  overflow: hidden;
  height: 47.2vw;
  background-color: #fff;
  text-align: center;
  /* position: relative; */
}
.about {
  /* position: relative; */
  position: relative;
}
.first {
  display: block;
  transform: none;
  position: absolute;
  width: 100%;
  height: 100%;
}

.jump {
  position: relative;
  float: left;
  margin-top: 2.93vw;
  width: 20%;
  text-decoration: none;
}

.slide-list {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}

.slide-list-img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.slide-list-cont {
  display: block;
  margin-top: 1.334vw;
  color: #666;
  font-size: 3.2vw;
}

.dot {
  position: absolute;
  bottom: 1.5vw;
  left: 50%;
  transform: translateX(-50%);
}

.dot-first,
.dot-second {
  width: 2.4vw;
  height: 0.4vw;
  margin: 0.667vw;
  display: inline-block;
  opacity: 0.2;
}

.dot-active-not {
  background-color: #000;
}
.dot-active {
  background-color: #fe7100;
}

.link {
  margin-bottom: 2.134vw;
  font-size: 0;
  padding: 0 2.67vw;
}
.activity {
  background: #fff;
}
.activity-color {
  margin-bottom: 0.8vw;
  display: flex;
}
.activity-index {
  height: 29.33vw;
  padding: 3.2vw 0 0 4vw;
  z-index: 0;
  position: relative;
  flex: 1;
  background: linear-gradient(0deg, #f4f4f4 5%, #fafafa 95%);
}
.good {
  font-size: 4.53vw;
  font-weight: 700;
  margin: 0;
  margin-bottom: 1.33vw;
  color: #333;
}
.each {
  font-size: 3.46vw;
  color: #777;
  margin-bottom: 2.4vw;
}
.shopping {
  font-size: 3.2vw;
  color: #af8260;
  font-weight: 700;
}
.img {
  top: 2.4vw;
  right: 3.73vw;
  width: 37.6vw;
  height: 25.06vw;
  position: absolute;
  bottom: -2vw;
}
.nologin {
  /* width: 80%; */
  margin: 0 auto;
  text-align: center;
}
.nologin-pos {
  color: #666;
}
.divider {
  font-size: 4vw;
  color: #000;
  border-color: #999;
  width: 35%;
  margin: 0 auto;
}
.home-filter {
  position: sticky;
  top: 13.3vw;
  z-index: 100;
}
.filter {
  margin: 0 auto;
  top: 0px;
  position: relative;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.667vw;
}
.filter-header {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 10.53vw;
  display: flex;
  z-index: 4;
  background-color: #fff;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  position: relative;
  font-size: 3.73vw;
  z-index: 101;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: 0;
  text-decoration: none;
}
.rotate {
  transform: rotate(90deg);
}
.nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3vw;
}
.nodata-img {
  display: block;
  width: 53.3vw;
}
.nodata-result {
  margin: 3.33vw 0 2.667vw;
  color: #6a6a6a;
  font-weight: 400;
  font-size: 4.5vw;
}
.nodata-shop {
  margin: 0 0 3.34vw;
  color: #999;
  font-size: 3.06vw;
  font-weight: 400;
}
.nodata-login {
  padding: 2.37vw;
  border: none;
  min-width: 32vw;
  border-radius: 0.53vw;
  background-color: #56d176;
  color: #fff;
  text-align: center;
  font-size: 3.5vw;
}
.shoplist {
  background-color: #fff;
}
.shoplist-item {
  position: relative;
  border-bottom: 0.13vw solid #eee;
  background-color: #fff;
  color: #666;
  padding: 4vw 0;
  list-style: none;
  font-size: 2.93vw;
  line-height: normal;
}
.shoplist-item-top {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0 2.667vw;
}
.shoplist-item-top-left {
  position: relative;
  flex: none;
  z-index: 0;
}
.shoplist-item-top-left-img {
  position: relative;
  width: 17.33vw;
  height: 17.33vw;
}
.shoplist-item-img {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0.533vw;
  border: 0.133vw solid rgba(0, 0, 0, 0.2);
}
.shoplist-item-top-right {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  user-select: none;
  padding-left: 2.667vw;
}
.shoplist-item-top-right-first {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.h3 {
  display: flex;
  margin: 0;
  padding: 0;
  color: #333;
  font-weight: 700;
  font-size: 4vw;
  overflow: hidden;
  align-items: center;
}
.ul {
  align-items: center;
  margin-left: 2.667vw;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
span {
  margin-left: 2.667vw;
  padding: 0 1.33vw;
}
.shoplist-item-top-right-second {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.star {
  display: flex;
  align-items: center;
}
.star-score {
  margin-right: 1.06vw;
}
.score {
  margin-right: 1.06vw;
}
.fengniao {
  display: flex;
  align-items: center;
}
.delivery {
  margin-left: 1.06vw;
  position: relative;
  padding: 0.4vw;
  color: transparent;
  white-space: nowrap;
  font-size: 2.67vw;
  border: 0.13vw solid transparent;
  border-radius: 0.4vw;
  line-height: 1.2;
}
.shoplist-item-top-right-third {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.send {
  display: flex;
  align-content: center;

}
.send-begin {
  color: #666;
  list-style: none;
  font-size: 2.93vw;
  line-height: normal;
  margin: 0;
  padding: 0;
}
.send-money {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.distance {
  display: flex;
  align-items: center;
  color: #999;
}
.shoplist-item-bottom {
  padding-left: 19.5vw;
}
.bottom-first {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 2.66vw 2.66vw 0 0;
}
.mini {
  margin-right: 1.33vw;
  margin-bottom: 1.06vw;
  position: relative;
  font-size: 2.66vw;
  /* color: transparent; */
  white-space: nowrap;
  padding: 0 1.06vw;
}
.null {
  width: 80%;
  height: 0.13vw;
  padding-right: 2.667vw;
}
.bottom-end {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-content: stretch;
  overflow: hidden;
}
.bottom-end-left {
  flex: 1;
  padding-right: 2.66vw;
  overflow: hidden;
}
.bottom-end-left-item {
  display: flex;
  align-items: center;
  font-size: 2.93vw;
  line-height: 4.8vw;
}
.bottom-end-right {
  padding: 0.8vw 2.666667vw 0 0;
  color: #999;
  text-align: right;
  font-size: 2.66667vw;
  line-height: 1;
}
.acvitive {
  vertical-align: middle;
  color: #999;
  text-align: right;
  font-size: 2.66vw;
  line-height: 1;
}
.none{
  height: 9vw;
}
.warp{
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.block{
  display: inline-block;
  position: relative;
  top: -0.5vw;
  height: 3.733333vw;
  width: 3.733333vw;
  vertical-align: middle;
  color: #fafafa;
  font-size: 2.93vw;
  line-height: 4vw;
  padding: 0;
  text-align: center;
  margin-left: 3.5vw;
}
.km{
  margin: 0;
  padding: 0;
  padding-right: 0.5vw;
}
.min{
  margin: 0;
  padding: 0;
  padding-left: 0.5vw;
}
</style>