<template>
  <div>
  <b-row>
    <b-col sm="8" class="mx-auto">
      <b-card class="card-accent-primary">    
          <div slot="header" class="my-3">
            <h4><strong>請假單</strong> - {{form.master.FORM_NO}}</h4>
            <span>請假申请流程，用于對公司內部員工需要請假申請時的審批。</span>
          </div>
          <b-form @submit="onSubmit" > 
              <b-row>
                      <b-col sm="3">
                            <b-form-group label="申請人工號:">
                                <b-form-input v-model="form.master.FILLER_EMP_NO" type="text" required/>
                            </b-form-group>
                      </b-col>              
                      <b-col sm="3">
                            <b-form-group label="申請人姓名:">
                              <b-form-input  v-model="form.master.FILLER_NAME" type="text" required></b-form-input>
                            </b-form-group>
                      </b-col>    
                      <b-col sm="3">
                        <b-form-group label="請假類型:">
                            <b-form-select v-model="form.master.IS_LEAVE_FORM" :options="options.leaveType" required/>
                        </b-form-group>
                      </b-col>                                                     
              </b-row>
              <b-row>                    
                    <b-col sm="3">    
                      <b-form-group label="請假開始日期:">               
                        <b-form-input v-model="form.items[0].BEGIN_DATE" type="date" required />                                        
                      </b-form-group>
                    </b-col>
                    <b-col sm="3">                   
                      <b-form-group label="請假開始時間:">               
                          <b-form-select v-model="form.items[0].BEGIN_TIME" :options="options.begin" required />                                        
                      </b-form-group>                  
                    </b-col>   
                      <b-col sm="3">
                        <b-form-group label="假別類型:">
                            <b-form-select v-model="form.items[0].LEAVE_TYPE" :options="options.leaveClass" required/>
                        </b-form-group>
                      </b-col>                                            
                </b-row>

                <b-row>                                          
                      <b-col sm="3">    
                        <b-form-group label="請假結束日期:">               
                          <b-form-input v-model="form.items[0].END_DATE" type="date" required />                                        
                        </b-form-group>
                      </b-col>
                      <b-col sm="3">                   
                        <b-form-group label="請假結束時間:">               
                          <b-select v-model="form.items[0].END_TIME" :options="options.end" required />                                        
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
                              required>
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
                <!--提交框 -->
                <wflow-send ref="child"></wflow-send>                     
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
import { postLeavesSign } from '@/api/HR/postLeavesSign.js'
import { getFormNo } from '@/api/WFlow/getFormNo.js'
import { Message, MessageBox } from 'element-ui'
import ListTable from '@/views/HR/ListTable.vue'
import { WFLowSend } from '@/views/WFlow/index.js'

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
          PUB_COMPANY_ID: this.$store.getters.pub_company_id,
          COMPANY_NO: this.$store.getters.company_no,
          FILLER_EMP_NO: this.$store.getters.emp_no,
          FILLER_NAME: this.$store.getters.name,
          ORG_NODE_NO: this.$store.getters.org_node_no,
          ORG_NODE_NAME: this.$store.getters.org_node_name,
          IS_LEAVE_FORM: 1,
          CREATED_UID: this.$store.getters.uid,
          UPDATED_UID: this.$store.getters.uid
        },
        items:[{
              ITEM:'',
              EMP_NO: this.$store.getters.emp_no,
              EMP_NAME: this.$store.getters.name,
              BEGIN_DATE: '',
              BEGIN_TIME: '',
              END_DATE:'',
              END_TIME:'',
              REASON:'',
              LEAVE_TYPE:''
            }],
        signinfo:{
          uums_form_kind_id: 114,
          pub_company_id:this.$store.getters.pub_company_id,
          form_no:"",
          sign_action:"",//1:草稿 2:送審
          sign_note:"",
          act_sign_uid:this.$store.getters.uid
        }
      },
      fields: {OVERTIME_ITEM:{label:'項次'},EMP_NO:{label:'工號'},EMP_NAME:{label:'姓名'}}
    }
  },
  components:{
    'list-table': ListTable,
    'wflow-send': WFLowSend
  },
  created() {
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
      // let beginday = formatDate(new Date(this.form.master.BEGIN_DATE),'yyyy-MM-dd')
      // let endday = formatDate(new Date(this.form.master.END_DATE),'yyyy-MM-dd')
      // if(!compareDate(beginday,endday))
      // {
      //   Message.error('請假結束日期不能小於開始日期')
      //   return
      // }
      //02.增加項次
      this.form.items.map(function(value,index,array){
        array[index].ITEM = index +1
      })
      this.form.signinfo.sign_note = this.form.master.REASON
      //05.子組件提交表單
      // alert(JSON.stringify(this.form))
      // return
      this.$refs.child.onPost(this.form)
    },
    fetchData() {
        getFormNo('114',this.$store.getters.pub_company_id)
        .then(response =>{
          if(response.data.Status == 200){
              this.form.master.FORM_NO = response.data.Data
              this.form.signinfo.form_no = response.data.Data
          }
        })
        .catch()
    }
  }
}
</script>