<template>
<div class="animated fadeIn"> 
  <!-- 使用標籤方式呈現APPS -->
  <b-row class="">
      <b-col sm="6" lg="3" v-for="(row,index) in rows" :key="index">
        <b-card class="text-white bg-primary" @click="GetApps(row.APP_CODE)">
          <div class="h3 text-muted text-right mb-0">
            <i class="icon-speech"></i>
          </div>        
          <div class="h5 m-0">{{row.APP_NAME}}</div>
          <div>Application...{{row.APP_CODE}}</div>
          <b-progress height={} class="progress-white progress-xs my-3" :value="25"/>
          <small class="text-muted">{{ row.DESCRIPTION }}</small>
        </b-card>
      </b-col>      
  </b-row>
  <!-- 使用圖標方式呈現APPS -->
  <div class="mains d-none">
        <div class="containers">
            <div class="containers-img" @click="GetApps('OA')"><b-img src="../../static/img/images/desktop/default.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>OA表單簽核</span>
        </div>
        <div class="containers">
            <div @click="GetApps('ADM')"><b-img src="../../static/img/images/desktop/address.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>後台管理</span>
        </div>
            <div class="containers">
            <div @click="GetApps('HR')"><b-img src="../../static/img/images/desktop/hr.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>HR系統</span>
        </div>
        <div class="containers">
            <div @click="GetApps('DEER_APPLY')"><b-img src="../../static/img/images/desktop/email.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>網域郵件</span>
        </div>  
        <div class="containers">
            <div @click="GetApps('DEER_APPLY')"><b-img src="../../static/img/images/desktop/asset.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>網域郵件</span>
        </div>
        <div class="containers">
            <div @click="GetApps('DEER_APPLY')"><b-img src="../../static/img/images/desktop/bbs.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>網域郵件</span>
        </div> 
        <div class="containers">
            <div @click="GetApps('DEER_APPLY')"><b-img src="../../static/img/images/desktop/book.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>網域郵件</span>
        </div> 
        <div class="containers">
            <div @click="GetApps('DEER_APPLY')"><b-img src="../../static/img/images/desktop/document.png" width="65" height="65" fluid alt="img" class="m-1" /></div>
            <span>網域郵件</span>
        </div>                                     
  </div>

</div>
</div>    
</template>
<script>
export default {
    name: 'apps',
    data(){
        return {
            rows: this.$store.getters.applists
        }
    },
    created(){
        //this.$store.commit('SIDEBAR_MIN') //左側邊框最小化
    },
    methods:{
        GetApps:function(code){
            //01.更新系統菜單
            this.$store.dispatch('GetAppMenus', {
                user_id: this.$store.getters.uid,
                app_code: code,
                pub_company_id: this.$store.getters.pub_company_id
            })
            //02.路由到相應頁面
            this.$router.push({path:code})
        }
    }
}
</script>
<style scoped>
.card {
    /* the other rules */
    transition: height 0.3s, box-shadow 0.3s;
  }
.card:hover {    
  box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.5);
  cursor:pointer;
}
.containers {
    width:100px;
    height:100px;
    text-align:center;
    transition: height 0.3s, box-shadow 0.3s;
}
.containers:hover {
    /* box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.5);*/
    cursor:pointer;
    color:blue;
    font-size:16px; 
}
.mains {
    display:flex;    
}
</style>