export default {
    changePlace(state,v){
        state.place = v;
        localStorage.setItem("place",v);
    },
    changelatitude(state,v){
        state.latitude = v;
        localStorage.setItem("latitude",v);
    },
    changelongitude(state,v){
        state.longitude = v;
        localStorage.setItem("longitude",v);
    },
    changeCity(state,v){
        state.city = v;
        localStorage.setItem("city",v);
    }
}