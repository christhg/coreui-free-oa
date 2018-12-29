<template>
    <b-nav-item-dropdown left no-caret >
          <template slot="button-content">          
                <b-nav-item class="px-4"><i class="icon-grid"></i> 其他應用</b-nav-item>                
         </template>      
            <b-card nobody style="width:700px">
                <div slot="header">
                    <i class="fa fa-font-awesome"></i> 其他系統應用
                </div>
                    <b-row class="text-center">
                    <b-col>
                        <b-button @click="getmenus">menu</b-button>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">                        
                        <b-link href="#app1"><i class="fa fa-address-book fa-lg mt-4"></i><br/>address-book</b-link>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-address-book-o fa-lg mt-4"></i><br/>address-book-o
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-address-card fa-lg mt-4"></i><br/>address-card
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-address-card-o fa-lg mt-4"></i><br/>address-card-o
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-bandcamp fa-lg mt-4"></i><br/>bandcamp
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-bath fa-lg mt-4"></i><br/>bath
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-bathtub fa-lg mt-4"></i><br/>bathtub <span class="text-muted">(alias)</span>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-drivers-license fa-lg mt-4"></i><br/>drivers-license <span class="text-muted">(alias)</span>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-drivers-license-o fa-lg mt-4"></i><br/>drivers-license-o <span class="text-muted">(alias)</span>
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-eercast fa-lg mt-4"></i><br/>eercast
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-envelope-open fa-lg mt-4"></i><br/>envelope-open
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-envelope-open-o fa-lg mt-4"></i><br/>envelope-open-o
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-etsy fa-lg mt-4"></i><br/>etsy
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-free-code-camp fa-lg mt-4"></i><br/>free-code-camp
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-grav fa-lg mt-4"></i><br/>grav
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-handshake-o fa-lg mt-4"></i><br/>handshake-o
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-id-badge fa-lg mt-4"></i><br/>id-badge
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-id-card fa-lg mt-4"></i><br/>id-card
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-id-card-o fa-lg mt-4"></i><br/>id-card-o
                    </b-col>
                    <b-col cols="6" sm="4" md="3" lg="2">
                        <i class="fa fa-imdb fa-lg mt-4"></i><br/>imdb
                    </b-col>
                    </b-row>
            </b-card>
    </b-nav-item-dropdown>
</template>
<script>
import store from '@/store'
export default {
  name: 'header-dropdown',
  data: () => {
    return {
    }
  },
  computed:{
   applists: function(){
       return store.getters.applists
   }
  },
  methods:{
      getmenus:function(){
          let payload = {
              user_id: store.getters.uid,
              app_code: 'DEER_APPLY',
              pub_company_id: store.getters.pub_company_id
          }
          this.$store.dispatch('GetAppMenus',payload)
      }
  }
}
</script>