<template>
    <div>
        <div class="login-wrap" v-show="showLogin">
            <h3>登录</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button v-on:click="login">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
        </div>

        <div class="register-wrap" v-show="showRegister">
            <h3>注册</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button v-on:click="register">注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    </div>
</template>


<script>
// import {setCookie,getCookie, delCookie} from '../base/js/cookie.js'
import { mapMutations } from 'vuex';

export default{

    data(){
        return{
            showLogin: true,
            showRegister: false,
            showTishi: false,
            tishi: '',
            username: '',
            password: '',
            userToken: '',
            newUsername: '',
            newPassword: '',
        }
    },
    mounted(){
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        // if(getCookie('username')){
        //     this.$router.push('/home')
        // }
        // console.log(this.$store.state.token)
    },
    methods:{
    ...mapMutations(['setToken']),

        login(){
            // let _this = this;
            if(this.username == "" || this.password == ""){
                this.tishi = '请输入用户名或密码'
                this.showTishi = true
            }else{
                let data = {'username':this.username,'password':this.password}
                // 接口请求
                this.axios.post('https://easy-mock.com/mock/5cb7ecb95f5cd34c8032fd7a/example/nser/login',data).then((res)=>{
                    _this.userToken = res.data.token;
                // 接口的传值是(-1,该用户不存在),(0,密码错误)
                    if(res.data == -1){
                        this.tishi = "该用户不存在"
                        this.showTishi = true
                    }else if(res.data == 0){
                        this.tishi = "密码输入错误"
                        this.showTishi = true
                    }else{
                        this.tishi = "登录成功"
                        this.showTishi = true
                        _this.setToken({token: _this.userToken});
                        _this.$router.push({path:"/home"});
                    }
                })
            }
                
                // this.axios.post('https://easy-mock.com/mock/5cb7ecb95f5cd34c8032fd7a/example/nser/login',data).then((res)=>{
                //     console.log(res.data);
                //     // _this.userToken = res.data.token;
                //     // _this.setToken({token: _this.userToken});
                //     // _this.$router.push({path:"/home"});
                // }).catch(error => {
                //     // this.tishi = '用户名或密码错误'
                //     // this.showTishi = true
                // });
                    
        },
        register(){
            if(this.newUsername == "" || this.newPassword == ""){
                this.tishi = '请输入用户名或密码'
                this.showTishi = true
            }else{
                let data = {'username':this.newUsername,'password':this.newPassword}
                this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
                    console.log(res.data)
                    if(res.data == "ok"){
                        this.tishi = "注册成功"
                        this.showTishi = true
                        this.username = ''
                        this.password = ''
                        /*注册成功之后再跳回登录页*/
                        setTimeout(function(){
                            this.showRegister = false
                            this.showLogin = true
                            this.showTishi = false
                        }.bind(this),1000)
                    }
                })
            }
        },
        ToRegister() {
            this.showLogin = false,
            this.showRegister = true
        },
        ToLogin() {
            this.showLogin = true,
            this.showRegister = false
        }
    }
}
</script>

<style>
    .login-wrap, .register-wrap {text-align:center;}
    input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>