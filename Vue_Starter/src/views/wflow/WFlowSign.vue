<template>
      <b-card >    
        <b-row>
            <b-col>
                    <b-row>
                        <b-col sm="6">
                            <b-form-group label="簽核動作">
                            <b-form-radio-group v-model="selected"
                                                :options="options"
                                                name="radioInline">
                            </b-form-radio-group>
                            </b-form-group>                
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="6">
                        <b-form-group id="exampleGroup4" label="簽核備註:">      
                            <b-form-textarea id="textarea1"
                                v-model="signinfo.sign_note"
                                placeholder=""
                                :rows="3"
                                :max-rows="6"
                                required>
                        </b-form-textarea>              
                        </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="6">             
                                    <b-button @click="onSubmit" variant="primary" class="btn-block">審核</b-button>                                                                         
                        </b-col>                                                                      
                    </b-row> 
            </b-col>             
        </b-row>
      </b-card >    
</template>
<script>
import { postSign } from '@/api/WFlow/postSign.js'
import { MessageBox } from 'element-ui'
export default {
    props:['formNo'],
    data(){
        return {
            signinfo:{
                form_no:"",
                sign_action:"",
                sign_note:"",
                act_sign_uid:this.$store.getters.uid,
            },
            selected: '2',
            options: [
                { text: ' 核准 ', value: '2' },
                { text: ' 駁回 ', value: 'Z' }
            ]
        }
    },
    methods:{
        onSubmit (){
            this.signinfo.sign_action = this.selected //簽核
            this.signinfo.form_no = this.formNo
            //alert(JSON.stringify(this.signinfo));
            //return
            //--------------------->
            postSign(this.signinfo)
            .then( response =>{
                if(response.data.Status == 201){
                    this.$router.push('/OA/Mywaiting') // 跳轉回待簽核列表
                }
                if(response.data.Status == 400){
                    MessageBox.alert(response.data.Message,'錯誤訊息')
                }
            })
        }
    }
}
</script>