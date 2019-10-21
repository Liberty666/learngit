
import axios from "axios";

axios.defaults.baseURL = "/proxy";


export default {
    // 请求短信验证码
    queryCode(store,params){
        return axios.post("/restapi/eus/login/mobile_send_code",params);
    },
    // 登录
    login(store,params){
        return axios.post("/restapi/eus/login/login_by_mobile",params);
    },
    // 获取图形验证码
    queryCaptcha(store,tel){
        return axios.post("/restapi/eus/v3/captchas",{
            captcha_str:tel
        });
    },
    // 获取地理位置
    getPlace(store,place){
        return axios.get("/restapi/bgs/poi/reverse_geo_coding",{
            params:place
        });
    },
    // 根据城市名字请求城市坐标
    queryCoordOfCity(store,city){
        axios({
            method:"get",
            url:"/geo/geocoder/v2/",
            params:{
                ak:"UQHYgOb7y8K4MXne70Tn1I4imhWqWM7A",
                address:city,
                output:"json"
            },
            baseURL:""
        })
        // axios.get("http://127.0.0.1:8080/geo/geocoder/v2/",{
        //     params:{
        //         ak:"UQHYgOb7y8K4MXne70Tn1I4imhWqWM7A",
        //         address:city,
        //         output:"json"
        //     }
        // })
        .then(res=>{
            console.log(res.data);
            store.commit("changelatitude",res.data.result.location.lat);
            store.commit("changelongitude",res.data.result.location.lng)
        })
    },
    // 根据搜索关键字和坐标请求地址列表
    querykeyList(store,position){
        return axios.get("/restapi/bgs/poi/search_poi_nearby_alipay",{
            params:position
        });
    },
    querySlideshow(store,position){
        return axios.get("/restapi/shopping/v2/entries",{
            params:position
        });
    },
    // querySlideshow(store,position){
    //     return axios.get("/restapi/bgs/poi/search_poi_nearby_alipay",{
    //         params:position
    //     });
    // },

    queryData(store,position){
        return axios.get("/restapi/shopping/v3/restaurants",{
            params:position
        });
    },
    isLogin(store,login){
        return axios.get("/restapi/eus/v2/new_user_check");
    },
}