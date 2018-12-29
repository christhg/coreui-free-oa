<template>
        <div class="overlay" v-show="showLoading">
            <div class="overlay-content">               
                <i class="fa fa-spinner fa-spin"></i>loading...
            </div>
        </div>
</template>
<script>
export default {
    name:'loading',
    props:['showLoading'],
    data(){
        return {
            // showLoading:true
        }
    }
}
</script>  
<style>
    section{
        width:100vh;
        height:100vh;
        position:relative;
    }
    .overlay {
        height: 100%;
        width: 100%;        
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0);
        overflow-x: hidden;
        transition: 0.5s;
    }
    .overlay-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
        margin-top: 30px;
        color: #f1f1f1;  
        font-size: 20px;
    }
    .overlay a {
        padding: 8px;
        text-decoration: none;
        font-size: 36px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .overlay a:hover, .overlay a:focus {
        color: #f1f1f1;
    }

    .overlay .closebtn {
        position: absolute;
        top: 20px;
        right: 45px;
        font-size: 60px;
    }

    @media screen and (max-height: 450px) {
    .overlay a {font-size: 20px}
    .overlay .closebtn {
        font-size: 40px;
        top: 15px;
        right: 35px;
    }
}    
</style>