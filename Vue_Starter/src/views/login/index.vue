<template>
    <div class="container">
        <div class="card card-container">     
            <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
            <img id="profile-img" class="profile-img-card" src="../../../static/img/logo_symbol.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <h2 class="title has-text-grey">OA系統登入(Login)</h2>
            <p class="subtitle has-text-grey">Please login to proceed.</p>   
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="exampleInputGroup1"
                                label="網域帳號(Domain):"
                                label-for="username"
                                description="We'll never share your email with anyone else.">
                    <b-form-input id="username"
                                type="text"
                                v-model="user.username"
                                required
                                placeholder=""
                                autofocus>
                    </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2"
                                label="密碼(Password):"
                                label-for="password">
                    <b-form-input id="password"
                                type="password"
                                v-model="user.password"
                                required
                                current-password
                                placeholder="">
                    </b-form-input>
                </b-form-group>
                <div class="field">
                    <label class="checkbox">
                        <input type="checkbox">記住帳號(Remember me)
                    </label>
                </div>                
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">登入(Sign in)</button>
            </b-form><!-- /form -->
            <a href="#" class="forgot-password">
                Forgot the password?
            </a>
        </div><!-- /card-container -->
    </div><!-- /container -->
</template>
<script>
export default {
        data(){
        return {
            show: true,
            user: {
                    username: 'weimingjiang',
                    password: '931840'
                  }
        }
        },
        components:{

        },
        methods:{
            onSubmit (evt) {
            evt.preventDefault();
            //alert(JSON.stringify(this.user));
                this.$store.dispatch('Login',this.user)//執行Action分發動作
                .then((result) => {
                    this.$router.push('/')
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
}
</script>   
<style lang="css" scoped>
body,html{
    height: 100%;  
    background-image:url(../../../static/img/bg.jpg);
    background-repeat: no-repeat;
    --background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));    
    font-family: Arial,"微軟正黑體","細明體";
}

.card-container.card {
    max-width: 550px;
    padding: 40px;
}

.btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

/*
 * Card component
 */
.card {
    background-color: #F7F7F7;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 120px;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 15px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 130px;
    height: 130px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    margin-top: -90px;
    padding: 3px;
    background-color: #fff;
}

/*
 * Form styles
 */
.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 0px 0 0;
    min-height: 1em;
}

.reauth-email {
    display: block;
    color: #404040;
    line-height: 2;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
}

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
    /*background-color: #4d90fe; */
    /* background-color: rgb(104, 145, 162);*/
    background-color: #0984e3;
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0px;
    font-weight: 700;
    font-size: 18px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color: rgb(12, 97, 33);
    background-color: #00b894;;
}

.forgot-password {
    color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: rgb(12, 97, 33);
}
</style>