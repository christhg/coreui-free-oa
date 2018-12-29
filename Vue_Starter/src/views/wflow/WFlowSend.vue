<template>
<div>
    <b-card>
            <!--組織簽核 --> 
            <b-row class="mb-2">
                      <b-col sm="6">
                          <b-form-group label="簽核流程: ">
                              <b-form-radio-group v-model="flowType"
                                                  :options="flowOptions"
                                                  name="flowtype">
                              </b-form-radio-group>
                          </b-form-group>                
                      </b-col>
            </b-row>
            <!--動作簽核 -->       
              <b-row class="mb-2">
                  <b-col sm="6">
                      <b-form-group label="提交動作">
                        <b-form-radio-group v-model="action"
                                            :options="radioActions"
                                            name="action">
                        </b-form-radio-group>
                      </b-form-group>                
                  </b-col>
              </b-row>   
              <b-row>
                  <b-col sm="6">
                  <b-form-group>                    
                      <b-button type='submit' variant="primary" class="btn-block">提交</b-button>                                                 
                  </b-form-group>
                  </b-col>                                                                      
              </b-row>
    </b-card>              
</div>             
</template>
<script>
import { postOvertimesSign } from '@/api/HR/postOvertimesSign.js'
import { postLeavesSign } from '@/api/HR/postLeavesSign.js'
import { MessageBox } from 'element-ui'

export default {
    props:{
        form: Object
    },
    data(){
        return {
            action: '1',
            radioActions: [
                { text: ' 保存草稿 ', value: '1' },
                { text: ' 提交送審 ', value: '2' }
            ],
            flowType: '1',
            flowOptions: [
                { text: ' 組織簽核 ', value: '1' },
                { text: ' 指定簽核 ', value: '2', disabled: true}
            ]
        }
    },
    methods:{
        // 提交表單統一方法
        onPost (form){
            form.signinfo.sign_action = this.action
            switch(form.signinfo.uums_form_kind_id){
                case 102: // 加班單
                    postOvertimesSign(form).then(response => {
                        this.showMessage(response)
                    })
                    break
                case 114: // 請假單
                    postLeavesSign(form).then( response => {
                        this.showMessage(response)
                    })
                    break
                default:
                    MessageBox.error("尚未建立對應表單post文件")
                    break
            }
        },
        // 顯示提交訊息
        showMessage (response){
            if(response.data.Status == 201){
                this.$router.push('/OA/Mysubmit')
            }else if(response.data.Status == 400){
                MessageBox.alert(response.data.Message,'錯誤訊息')
            }else{
                MessageBox.alert('提交出錯了!')
            }
        }
    }
}
</script>