<template>
<div>
<hr>
<span v-show="isMobile" class="text-primary">簽核紀錄</span>
  <b-table v-show="!isMobile" striped hover :items="rows" :fields="fields" caption-top stacked="md">
    <template slot="table-caption">
      <span class="text-primary">簽核紀錄</span>
    </template>
      <template slot="ACT_SIGN_NAME" slot-scope="data">
        <div v-html="data.item.ACT_SIGN_NAME"></div>
      </template>
      <template slot="ACTION_NAME" slot-scope="data">
        <span v-html="data.item.ACTION_NAME"></span>
      </template>  
      <template slot="ACTION_AT" slot-scope="data">
        <span v-html="data.item.ACTION_AT"></span>
      </template>           
  </b-table>
  
  <b-card v-show="isMobile" v-for="(row,index) in rows" :key="index" 
  bg-variant="white" 
  text-variant="dark" 
  :header="row.SIGN_STEP + '.' + row.ROLE_NAME + ':' +row.ACT_SIGN_NAME + ' <i class=\'icon-arrow-right-circle\'></i> ' + row.ACTION_NAME"
  header-tag="header"
  sub-title="" 
  footer=""
  footer-tag="footer">
  <span class="text-primary">{{row.SIGN_NOTE==null?'':'備註：'+row.SIGN_NOTE}}</span><br>
  <span class="text-success" v-html="row.ACTION_AT==null?'':'時間：'+row.ACTION_AT"></span>
  </b-card>  
</div>  
</template>
<script>
import { getSignedRecords } from '@/api/WFlow/getSignedRecords.js'
//import { getInstanceLogs } from '@/api/WFlow/getInstanceLogs.js'
export default {
    props:['formNo'],
    data(){
        return {
            screenWidth:document.body.clientWidth,
            fields: [
                { key: 'SIGN_STEP', label: '序次' },
                { key: 'ACT_SIGN_NAME', label: '簽核者' },
                { key: 'ROLE_NAME', label: '角色' },
                { key: 'ACTION_NAME', label: '動作' },
                { key: 'ACTION_AT', label: '時間' },
                { key: 'SIGN_NOTE', label: '備註' }
             ],
            rows:[],
            finished:{
                        "SIGN_STEP": "-",
                        "ACT_SIGN_NAME": "-",
                        "ROLE_NAME": "-",
                        "ACTION_NAME": "<span style=\"color:green\">已結案</span>",
                        "ACTION_AT": "-",
                        "SIGN_NOTE":"-"
                    }
        }
    },
    methods:{
      filterHtml: function(val){
          return val
      }
    },
    mounted:function(){
        this.onResize()
        getSignedRecords(this.formNo).then(response=>{
            this.rows = response.data.Data
            this.isFinished
        }).catch(

        )
    },
    computed:{
      isFinished:function(){
        if(this.rows.length>0){
          if(this.rows[0].STATUS == 'P'){
            this.finished.SIGN_STEP = this.rows.length+1
            this.rows.push(this.finished)
          }
        }
      },
      isMobile(){
          return this.screenWidth<400?true:false
      }
    },
    methods:{
      onResize(){
        const that = this
        window.onresize = () => {
          return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
          })()
        }
      }
    }
}
</script>