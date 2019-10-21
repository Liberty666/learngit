<template>
  <div>
    <div class="header">
      <div class="pos">
        <van-icon name="arrow-left" class="left" @click="$router.back()" />
        <div class="location">选择收货地址</div>
        <span class="add">新增地址</span>
      </div>
    </div>
    <div class="search">
      <div class="index-city" @click="showCitySelector=!showCitySelector">
        <span class="city">{{city?city:"选择..."}}</span>
        <van-icon :name="bottom2" size="3vw" />
      </div>
      <div class="seek">
        <van-icon name="search" class="seek-search" />
        <input type="text" v-model="keyword" @input="testInput($event)" class="input" placeholder="请输入地址" />
      </div>
    </div>
      <!-- <div v-show="nun" class="distance" v-for="p in location" :key="p.name">
        <p>{{p.name}}
          <span>{{p.distance}}</span>
        </p>
        <p>{{p.short_address}}</p>
      <hr> -->
      <van-cell-group v-show="nun">
        <van-cell @click="addCellClick(add)" v-for="add in location" :key="add.name" :title="add.name" :value="add.distance" :label="add.short_address" />
      </van-cell-group>

      <!-- </div> -->
    <div>
      <van-area @confirm="onChooseCity" v-show="showCitySelector" :area-list="areaList" :columns-num="2" />
    </div>
  </div>
</template>

<script>
import bottom2 from "@/assets/bottom2.png";
import { mapActions, mapState, mapMutations } from "vuex";
import areaList from "@/data/area.js";

export default {
  data() {
    return {
      bottom2,
      keyword:"",
      location:[],
      nun:false,
      areaList,
      showCitySelector:false,
      keyword:""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChooseCity(e){
      // console.log(e[1].name);
      this.changeCity(e[1].name);
      this.queryCoordOfCity(this.city);
      this.showCitySelector = false;
    },
    addCellClick(add){
      this.changelatitude(add.latitude);
      this.changelongitude(add.longitude);
      this.changePlace(add.name);
      this.$router.back();
    },
    testInput(e){
      // console.log(e.target.value);
      if(e.target.value == ""){
        this.nun = false;
      }else{
        this.querykeyList({
          keyword:e.target.value,
          offset:0,
          limit:20,
          latitude:this.latitude,
          longitude:this.longitude
          // latitude:localStorage.getItem("latitude"),
          // longitude:localStorage.getItem("longitude"),
        })
        .then(res=>{
          // console.log(res.data);
          this.nun = true;
          this.location = res.data;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    innerText() {

    },
    ...mapActions(["getPlace","changeCity","querykeyList","queryCoordOfCity"]),
    ...mapMutations(["changePlace","changeCity","changelatitude","changelongitude"])
  },
  computed: {
    ...mapState(["place","latitude","longitude",'city']),
  },
};
</script>
<style scoped>
.header {
  position: sticky;
  top: 0px;
  z-index: 1000;
}
.pos {
  position: relative;
  width: 100%;
  color: #fff;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  text-align: center;
  font-size: 3.2vw;
}
.location {
  line-height: 11.7vw;
  text-align: center;
  font-size: 4.8vw;
}
.left {
  position: absolute;
  left: 3.33vw;
  top: 3.33vw;
  width: 5.33vw;
  height: 5.33vw;
  font-size: 4.8vw;
}
.add {
  font-size: 4vw;
  position: absolute;
  top: 3.47vw;
  right: 4.27vw;
}
.search {
  display: flex;
  background-color: #fff;
}
.index-city {
  align-items: center;
  padding-left: 4vw;
  display: flex;
}
.city {
  font-size: 3.2vw;
  background: #fff;
  width: 10.667vw;
  color: #333;
  margin-right: 1.34vw;
  white-space: nowrap;
  text-overflow: hidden;
  text-align: center;
}
.seek {
  position: relative;
  padding: 2.67vw;
  flex: 1;
  width: 100%;
  height: 9.6vw;
}

.input {
  font-size: 3.47vw;
  line-height: 4.8vw;
  color: #999;
  width: 62vw;
  border-radius: 1vw;
  padding: 2.4vw 4.8vw 2.4vw 6.67vw;
  background: #f2f2f2;
  border: none;
}
.seek-search {
  position: absolute;
  width: 3.73vw;
  height: 3.73vw;
  left: 5.86vw;
  top: 5.6vw;
}
.distance{
  margin: 0 20px;
}
</style>