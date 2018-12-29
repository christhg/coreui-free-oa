<template>
<div class="animated fadeIn">
<b-card-group columns>
    <b-card v-for="(item,index) in publish" :key="index"
        border-variant="primary"
        header-bg-variant="danger"
        bg-variant="white" 
        text-variant="dark size-lg"                 
        :header="item.title"
        footer-tag="footer"
        > 
          <div slot="header">
            <div class="h5">{{item.title}}
            <b-badge v-if="index===0" variant="primary" class="float-right">New</b-badge>
            </div>
            
          </div>        
            <p class="card-text">
                {{item.content}}.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content
                than the first.
            </p>
            <div class="h6">{{item.date}}</div>
    </b-card>   
</b-card-group>    
    <my-loading-line></my-loading-line>
</div>
</template>
<script>
import BottomLoadingLine from '@/views/Components/BottomLoadingLine'
export default {
    data(){
        return {
            publish:[
            {
                title: "公告：系統更新",
                content: '其他帐号可在团队成员设置，邀请列表中找到初始密码',
                date:'2018-08-16T14:46:12',
            },
            {
                title: "公告：停機通知",
                content: '其他帐号可在团队成员设置，邀请列表中找到初始密码',
                date:'2018-07-16T14:46:12',
            },
            {
                title: "公告：停機通知",
                content: '其他帐号可在团队成员设置，邀请列表中找到初始密码',
                date:'2018-05-16T14:46:12',
            }
            ],
        }
    },
    components:{
        'my-loading-line': BottomLoadingLine
    }
}
</script>
<style scoped>
.btn-180{
    width:180px;
}
.card {
    /* the other rules */
    transition: height 0.3s, box-shadow 0.3s;
  }
.card:hover {    
  box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.5);
}
</style>