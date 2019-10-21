<template>
    <div>
        <div class="header" @click="gotoLogin">
            <img src="@/assets/avatar-holder.png" class="avatar">
            <div class="mid">
                <p class="top-line">登录/注册</p>
                <p class="bottom-line">
                    <van-icon name="graphic" />
                    登录后享受更多特权
                </p>
            </div>
            
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        gotoLogin(){
            this.$router.push("/me/login");
        }
    },
}
</script>

<style scoped>
    .header{
        display: flex;
        padding: 6.6vw 4vw;
        background: linear-gradient(90deg,#0af,#0085ff);
        color: white;
        align-items: center;
    }

    .avatar{
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
    }

    .mid{
        margin-left: 4.8vw;
        flex-grow: 1;
    }

    .top-line{
        margin: 0;
        font-size: 5.6vw;
        font-weight: 700;
    }

    .bottom-line{
        margin: 0;
        font-size: 3.2vw;
        margin-top: 2vw;
    }
</style>