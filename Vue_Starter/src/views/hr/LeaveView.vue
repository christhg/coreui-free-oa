<template>
  <div id="pdfDom" style="background-color:#fff;">
    <b-row>
      <b-col sm="8" class="mx-auto">
        <b-card class="card-accent-primary">    
            <div slot="header" class="my-3">
              <h4><strong>請(銷)假單</strong> - {{form.master.FORM_NO}}</h4>
              <span>加班申请流程用于对企业内员工需要加班时的申请审批</span>
            </div>
            <b-form @submit="onSubmit"> 
                <b-row>
                        <b-col sm="3">
                              <b-form-group label="申請人工號:">
                                  <b-form-input v-model="form.master.FILLER_EMP_NO" type="text" required readonly/>
                              </b-form-group>
                        </b-col>              
                        <b-col sm="3">
                              <b-form-group label="申請人姓名:">
                                <b-form-input  v-model="form.master.FILLER_NAME" type="text" required readonly></b-form-input>
                              </b-form-group>
                        </b-col>    
                        <b-col sm="3">
                          <b-form-group label="請假類型:">
                              <b-form-select v-model="form.master.IS_LEAVE_FORM" :options="options.leaveType" required disabled/>
                          </b-form-group>
                        </b-col>                                                     
                </b-row>
                <b-row>                    
                      <b-col sm="3">    
                        <b-form-group label="請假開始日期:">               
                          <b-form-input v-model="form.items[0].BEGIN_DATE" type="date" required readonly/>                                        
                        </b-form-group>
                      </b-col>
                      <b-col sm="3">                   
                        <b-form-group label="請假開始時間:">               
                            <b-form-select v-model="form.items[0].BEGIN_TIME" :options="options.begin" required disabled/>                                        
                        </b-form-group>                  
                      </b-col>   
                        <b-col sm="3">
                          <b-form-group label="假別類型:">
                              <b-form-select v-model="form.items[0].LEAVE_TYPE" :options="options.leaveClass" required disabled/>
                          </b-form-group>
                        </b-col>                                            
                  </b-row>

                  <b-row>                                          
                        <b-col sm="3">    
                          <b-form-group label="請假結束日期:">               
                            <b-form-input v-model="form.items[0].END_DATE" type="date" required readonly/>                                        
                          </b-form-group>
                        </b-col>
                        <b-col sm="3">                   
                          <b-form-group label="請假結束時間:">               
                            <b-select v-model="form.items[0].END_TIME" :options="options.end" required disabled/>                                        
                          </b-form-group>                  
                        </b-col>                              
                    </b-row>

                    <b-row>
                        <b-col sm="6">
                        <b-form-group id="exampleGroup4" label="請假理由:">      
                            <b-form-textarea id="textarea1"
                                v-model="form.items[0].REASON"
                                placeholder=""
                                :rows="3"
                                :max-rows="6"
                                required
                                readonly>
                          </b-form-textarea>              
                        </b-form-group>
                        </b-col>
                    </b-row>
                    <!--請假人員 -->
                    <b-row>
                      <b-col sm="12">
                            <b-form-group label="請假人員:">    
                                <table class="table table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th style="width: 20px;">No.</th>
                                        <th style="width: 120px;">工號</th>
                                        <th style="width: 120px;">姓名</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>
                                          1
                                            </td>            
                                            <td>
                                                <input class="form-control" v-model="form.items[0].EMP_NO"  readonly required/>
                                            </td>
                                            <td>
                                                <input class="form-control" v-model="form.items[0].EMP_NAME"  readonly required/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-form-group>            
                      </b-col>          
                    </b-row>
                    <!-- 簽核狀態框 -->   
              <list-signed-records :formNo="formNo"></list-signed-records>   
              <b-row v-if="form.master.WF_INSTANCE_STATUS=='H'">
                  <b-col sm="6">
                      <b-form-group label="提交動作">
                      <b-form-radio-group v-model="action"
                                          :options="radiooptions"
                                          name="radioInline">
                      </b-form-radio-group>
                      </b-form-group>                
                  </b-col>
              </b-row>                          
              <b-row v-if="form.master.WF_INSTANCE_STATUS=='H'">            
                  <b-col sm="6">
                      <b-form-group>
                          <b-button type="submit" variant="primary" class="btn-block">提交</b-button>                                                 
                      </b-form-group>
                  </b-col>                                                                      
              </b-row>                  
              </b-form>           
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as moment from 'moment';
import { formatDate } from '@/utils/formatDate.js'
import { compareDate } from '@/utils/compareTime.js'
import { getLeavesDetails } from '@/api/HR/getLeavesDetails.js'
import { Message, MessageBox } from 'element-ui'
import { WFlowSignedRecords } from '@/views/WFlow/index.js'
import { postSign } from '@/api/WFlow/postSign.js'

export default {
  data () {
    return {
      options: {
        leaveType:[
                  { value: null, text: '請選擇類型' },
                  { value: 1, text: '請假' },
                  { value: 0, text: '銷假' }
        ],
        leaveClass:[
                  { value: null, text: '請選擇假別' },
                  { value: 1, text: '事假' },
                  { value: 2, text: '公傷假' },
                  { value: 3, text: '病假' },
                  { value: 4, text: '病假(住院)' },
                  { value: 5, text: '婚假' },
                  { value: 6, text: '產假' },
                  { value: 7, text: '護理假(陪產假)' },
        ],
        begin:[
                  { value: null, text: '請選擇開始時間' },
                  { value: '08:00', text: '08:00' },
                  { value: '09:00', text: '09:00' },
                  { value: '10:00', text: '10:00' },
                  { value: '11:00', text: '11:00' },
                  { value: '12:00', text: '12:00' },
                  { value: '13:00', text: '13:00' },
                  { value: '14:00', text: '14:00' },
                  { value: '15:00', text: '15:00' },
                  { value: '16:00', text: '16:00' },
                  { value: '17:00', text: '17:00' }
        ],
        end:[
                  { value: null, text: '請選擇結束時間' },
                  { value: '08:00', text: '08:00' },
                  { value: '09:00', text: '09:00' },
                  { value: '10:00', text: '10:00' },
                  { value: '11:00', text: '11:00' },
                  { value: '12:00', text: '12:00' },
                  { value: '13:00', text: '13:00' },
                  { value: '14:00', text: '14:00' },
                  { value: '15:00', text: '15:00' },
                  { value: '16:00', text: '16:00' },
                  { value: '17:00', text: '17:00' }
            ]
      },
      form: {
        master:{
          FORM_NO: '',
          PUB_COMPANY_ID: '',
          COMPANY_NO: '',
          FILLER_EMP_NO: '',
          FILLER_NAME: '',
          ORG_NODE_NO: '',
          ORG_NODE_NAME: '',
          IS_LEAVE_FORM: '',
          CREATED_UID: '',
          UPDATED_UID: ''
        },
        items:[{
              ITEM:'',
              EMP_NO:'',
              EMP_NAME: '',
              BEGIN_DATE: '',
              BEGIN_TIME: '',
              END_DATE:'',
              END_TIME:'',
              REASON:'',
              LEAVE_TYPE:''
            }],
        signinfo:{
            form_no:"",
            sign_action:"",//0:作廢 1:草稿 2:送審
            sign_note:"",
            act_sign_uid:this.$store.getters.uid
        }
      },
      fields: {OVERTIME_ITEM:{label:'項次'},EMP_NO:{label:'工號'},EMP_NAME:{label:'姓名'}},
      action: '2',
      radiooptions: [
          { text: ' 提交送審 ', value: '2' },
          { text: ' 保存草稿 ', value: '1' },
          { text: ' 撤銷草稿 ', value: '0' }
      ]
    }
  },
  components:{
    'list-signed-records': WFlowSignedRecords,
  },
  created(){
      this.formNo = this.$route.query.formNo
      this.fetchData()
  },
  computed:{
    isReadonly: function() {
      return false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      //01.判斷條件
      //02.增加項次
      this.form.items.map(function(value,index,array){
        array[index].ITEM = index +1
      })
      let msg =""
      switch(this.action){
        case '0':
          // this.form.master.WF_INSTANCE_STATUS = 'Z'
          this.form.signinfo.sign_action = '0'
          this.form.signinfo.sign_note = this.form.master.REASON
          msg = '提交作廢成功'
          break;
        case '1':
          // this.form.master.WF_INSTANCE_STATUS = 'H'
          this.form.signinfo.sign_action = '1'
          this.form.signinfo.sign_note = this.form.master.REASON
          msg = '保存草稿成功'
          break;
        case '2':
          // this.form.master.WF_INSTANCE_STATUS = 'A'
          this.form.signinfo.sign_action = '2'
          this.form.signinfo.sign_note = this.form.master.REASON
          msg = '提交送審成功'
          break;
      }
      //alert(JSON.stringify(this.form))
      //return
      //提交問題? 解決跨域POST問題?
      postSign(this.form.signinfo)
      .then( response =>{
        if(response.data.Status == 201){
          this.$router.push('/OA/Mysubmit')
        }
        if(response.data.Status == 400){
          MessageBox.alert(response.data.Message,'錯誤訊息')
        }
      })

    },
    fetchData() {
            getLeavesDetails(this.formNo).then(response=>{
                this.form.master = response.data.Data.MASTER
                this.form.items = response.data.Data.ITEMS
                this.form.signinfo.form_no = response.data.Data.MASTER.FORM_NO
                this.form.signinfo.sign_note = ''
            }).catch(error=>{
                MessageBox.alert(error)
            })
    }
  }
}
</script>