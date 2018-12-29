<template>
    <b-button  variant="outline-primary" size="sm" @click.stop="doUrge" class="mr-1">
        <i class="fa fa-star"></i>&nbsp; 催簽(Push)
    </b-button>
</template>
<script>
import { postUrge }  from '@/api/WFlow/postUrge.js'
import { MessageBox } from 'element-ui'

export default {
    props:['kindId','formNo'],
    data(){
        return {
            signinfo:{
                uums_form_kind_id:'', //加班單:102
                pub_company_id:'',
                form_no:'',
                act_sign_uid:'',
            },
        }
    },
    methods:{
        doUrge(value){
            this.signinfo.uums_form_kind_id = this.kindId
            this.signinfo.pub_company_id = this.$store.getters.pub_company_id
            this.signinfo.form_no = this.formNo
            this.signinfo.act_sign_uid = this.$store.getters.uid
            postUrge(this.signinfo).then(
                response => {
                    MessageBox.alert('催簽成功!!')
                }
            ).catch( error => {
                    MessageBox.alert(error,'錯誤訊息!!')
            })
        }
    }
}
</script>