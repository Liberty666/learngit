<template>
    <div class="root">
        <img 
            src="https://shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png"
            alt=""
            class="logo"
        >

        <div class="container">
            <div class="input-line">
                <input 
                    type="text" 
                    class="input-field"
                    placeholder="手机号"
                    v-model="tel"
                    maxlength="11"
                >
                <button 
                    class="code-btn"
                    :disabled="!isTelValid"
                    @click="getCodeClick"
                >{{btnTitle}}</button>
            </div>
            <div class="input-line">
                <input 
                    type="text" 
                    class="input-field"
                    placeholder="验证码"
                    v-model="code"
                >
            </div>
    
            <p class="note">
                新用户登录即自动注册，并表示已同意
                <a href="//h5.ele.me/service/agreement/#initTitle=%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE&key=ruleQue18">《用户服务协议》</a>和
                <a href="http://terms.alicdn.com/legal-agreement/terms/suit_bu1_other/suit_bu1_other201903051859_43484.html">《隐私权政策》</a>
            </p>


            <van-button 
                type="primary" 
                class="login-btn"
                @click="loginClick"
            >登录</van-button>

            <p class="about">关于我们</p>

        </div>

        
        <!-- 弹出框 -->
        <van-dialog
            v-model="showCaptcha"
            title="请填写图形验证码"
            show-cancel-button
            @confirm="confirmClick"
        >
            <input type="text" v-model="captcha_value">
            <img :src="captcha_image">
        </van-dialog>



    </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
    data(){
        return {
            tel:"",
            countdown:0,
            validate_token:"",
            code:"",
            
            showCaptcha:false,
            captcha_value:"",
            captcha_hash:"",
            captcha_image:""
        }
    },
    computed: {
        isTelValid(){
            let telReg = /^1[356789]\d{9}$/;
            return telReg.test(this.tel)&&this.countdown<=0;
        },
        btnTitle(){
            if(this.countdown>0){
                return "获取验证码("+this.countdown+")";
            }else{
                return "获取验证码";
            }
        }
    },
    methods: {
        ...mapActions(["queryCode","login","queryCaptcha"]),
        getCode(){
            this.queryCode({
                captcha_hash:this.captcha_hash,
                captcha_value:this.captcha_value,
                mobile:this.tel,
                scf:"ms"
            })
            .then(res=>{
                this.validate_token = res.data.validate_token;
                //console.log(res);
            })
            .catch(err=>{
                // 该账号存在风险，需要图形验证码
                if(err.response.status==400){
                    this.queryCaptcha(this.tel)
                    .then(res=>{
                        this.captcha_hash = res.data.captcha_hash;
                        this.captcha_image = res.data.captcha_image;
                        this.showCaptcha = true;
                    });
                }
                
            })
        },
        getCodeClick(){
            this.getCode();

            this.countdown = 30;
            let timer = setInterval(() => {
                this.countdown--;
                if(this.countdown==0){
                    clearInterval(timer);
                }
            }, 1000);
        },

        confirmClick(){
            this.getCode();
        },

        loginClick(){
            this.login({
                mobile:this.tel,
                scf:"ms",
                validate_code:this.code,
                validate_token:this.validate_token
            })
            .then(res=>{
                if(res.data.user_id){
                    this.$toast.success("登录成功");
                    this.$router.push("/");
                }else{
                    this.$toast.fail("登录失败");
                }
            })
            
        }
    },
}
</script>

<style scoped>
    .root{
        background-color: white;
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo{
        margin-top: 40px;
        width: 130px;
        height: 56px;
    }

    .container{
        width: 300px;
    }

    .input-line{
        /* height: 48px; */
        
        margin-top: 16px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .input-field{
        height: 46px;
        border: none;
        color :#333;
        font-size: 14px;
        padding-left: 10px;
        

        border: solid 1px rgb(221, 221, 221);
        border-radius: 4px;
        width: 100%;
    }
    .input-field::placeholder{
        color: #999;
    }

    .input-field:focus{
        border-color: #0089dc;
    }

    .code-btn{
        border: none;
        background: none;
        font-size: 14px;
        color: #2395ff;
        position: absolute;

        right: 0;
        top: 16px;
    }

    .code-btn:disabled{
        color: #CCCCCC;
    }

    .note{
        font-size: 14px;
        color: #999;
    }

    .note a{
        color: #2395ff;
    }

    .login-btn{
        width: 100%;
        margin-top: 20px;
    }

    .about{
        text-align: center;
        font-size: 12px;
        color: #999;

    }
    
</style>



<!-- 

    获取验证码的接口：
    https://h5.ele.me/restapi/eus/login/mobile_send_code
    请求方式:POST

    参数：
    captcha_hash:
    captcha_value:
    mobile:13613800129
    scf:ms

    获得数据：
    validate_token:54ed67606d679ca0e0d412ea3a862f0d6bd4d382994be00ce6b0f9658c61e261


 -->

<!-- 
    登录接口:
    https://h5.ele.me/restapi/eus/login/login_by_mobile
    请求方式：POST

    参数:
    mobile:13613800129
    scf:ms
    validate_code:310815
    validate_token:54ed67606d679ca0e0d412ea3a862f0d6bd4d382994be00ce6b0f9658c61e261

    获得数据
    need_bind_mobile:false
    user_id:187716520
-->