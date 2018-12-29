<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">OA系統登入(Login)</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../../../static/img/logo_symbol.soly.png">
            </figure>
            <form>
              <div class="field">
                <div class="control has-icon">
                  <input class="input is-large" type="text" placeholder="網域帳號(Domain Account)" v-model:value="user.username" autofocus="" autoComplete="on">
                  <span class="icon is-small">
                        <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <input class="input is-large" type="password" placeholder="你的密碼(Your Password)" v-model:value="user.password" autoComplete="on">
                  <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                  </span>                  
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" @click="login_handle">登入(Login)</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
//import qs from 'qs'
//import { setToken } from '@/utils/auth'
import 'bulma/css/bulma.min.css'
export default {
        data(){
        const validateName = (rule, value, callback) => {
          if (value == "") {
            //export function isWscnEmail(str) {
            //const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wz\.com$/i;
            //return reg.test(str.trim());
            //}
            callback(new Error('请输入正确的帳號'));
          } else {
            callback();
          }
        };
        const validatePass = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码不能小于6位'));
          } else {
            callback();
          }
        };
        return {
            show:false,
            user: {
                    username: 'sengyi',
                    password: 'seng1234'
                }
        }
        },
        methods:{
            login_handle:function(){
                this.loading = true
                this.$store.dispatch('Login',this.user)//執行Action分發動作
                .then((result) => {
                  this.loading = false
                  this.$router.push('/')
                  console.log(result)
                })
                .catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            }
        }
}
</script>
<style>
html,body {
  ---font-family: 'Open Sans', serif;
  font-size: 14px;
  font-weight: 300;
  
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
--width: 96px;
--height: 96px;
  --margin-top: -70px;
  --margin-bottom: 20px;
  --padding-bottom: 20px;
	--	position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		top: -30px;
		width: 128px;
		height: 128px;
		--border-radius: 50%;
		--z-index: 9;
		--background: #60c7c1;
		--padding: 15px;
		--box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);  
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}    
</style>