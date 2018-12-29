<template>
<div>
        <el-steps :space="200" :active="isActive" finish-status="success">
            <el-step v-for="(row,index) in rows" :key="index" :title="row.ACTION_NAME" :description="row.ACT_SIGN_NAME +'(' + timeFilter(row.ACTION_AT) +')'"></el-step>
        </el-steps>
</div>
</template>
<script>
import { getInstanceLogs } from '@/api/wflow/getInstanceLogs'
import Vue from 'vue'
import { Steps,Step } from 'element-ui'
Vue.use(Steps)
Vue.use(Step)
export default {
    props:['formId','companyId','formNo'],
    data(){
        return {
            rows:[],
            finished:{
                        "SIGN_STEP": "",
                        "ACT_SIGN_NAME": "",
                        "SIGN_RESULT": "Y",
                        "ACTION_NAME": "已結案",
                        "ACTION_AT": "-"
                    }
        }
    },
    computed:{
        isActive: function(){
            let n = 1;
            for(var i=0;i<this.rows.length;i++){
                if(this.rows[i].STATUS == 'P'){
                    this.rows.push(this.finished)
                    return this.rows.length
                }
                if(this.rows[i].SIGN_RESULT == 'X'){
                    n = i
                    break
                }
            }
            return n
        }
    },
    methods:{
        timeFilter(value){
            if(value == null) return ''
            return value
        }
    },
    mounted: function() {
        getInstanceLogs(this.formNo).then( response => {
            this.rows = response.data.Data
        })
        .catch()
    }
}
</script>