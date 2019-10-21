import Vue from "vue";
Vue.filter("substr",function(num){
    num = num.split("");
    num.splice(0,0,"/");
    num.splice(2,0,"/");
    num.splice(5,0,"/");
    num = num.join("");
    return "https://cube.elemecdn.com"+num+".jpeg?x-oss-process=image/resize,w_90,h_90,m_fixed";
});
Vue.filter("img",function(src){
    src = src.split("");
    src.splice(0,0,"/");
    src.splice(2,0,"/");
    src.splice(5,0,"/");
    src = src.join("");
    if(src.indexOf("jpeg")>0){
        return "https://cube.elemecdn.com"+src+".jpeg?x-oss-process=image/resize,w_130,h_130,m_fixed";
    }
    if(src.indexOf("png")>0){
        return "https://cube.elemecdn.com"+src+".png?x-oss-process=image/resize,w_130,h_130,m_fixed";
    }
});
Vue.filter("background",function(color){
    return "background-color:#"+color;
});
Vue.filter("km",function(m){
    if(m<1000){
        return m+"m";
    }
    return m/1000 + "km"
})