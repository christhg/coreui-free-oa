<template>
<div class="overlay" v-show="showLoading">
        <div class="loader overlay-content">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>            
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
    body {
    margin: 0;
    }
    /* 遮罩 */
    .overlay { 
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0, 0); /* 背景色深度 越小越淺 */
        overflow-x: hidden; /* 自動隱藏超出的文字或圖片 */
        transition: 0.5s;
    }
     /* 遮罩內DIV */
    .overlay-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }    

    .loader {
    position: absolute;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate3d(-50%, -50%, 0);
    }
    .dot {
    width: 24px;
    height: 24px;
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
    }
    .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: #32aacc;
    }
    .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: #64aacc;
    }
    .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: #96aacc;
    }
    .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: #c8aacc;
    }
    .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: #faaacc;
    }
    @-moz-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
    }
    @-webkit-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
    }
    @-o-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
    }
    @keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
    }

</style>