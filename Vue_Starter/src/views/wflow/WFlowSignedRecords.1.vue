<template>
  <b-table striped hover :items="rows" :fields="fields" caption-top stacked="md">
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
</template>
<script>
import { getSignedRecords } from '@/api/WFlow/getSignedRecords.js'
//import { getInstanceLogs } from '@/api/WFlow/getInstanceLogs.js'
export default {
    props:['formNo'],
    data(){
        return {
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
      }
    }
}
</script>