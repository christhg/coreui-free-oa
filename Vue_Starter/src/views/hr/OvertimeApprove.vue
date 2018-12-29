<template>
  <div>  
  <b-row>
    <b-col sm="8" class="mx-auto">
      <b-card class="card-accent-primary">    
          <div slot="header" class="my-3">
            <h4><strong>加班申請單</strong> - {{form.master.OVERTIME_NO}}</h4>
            <span>加班申请流程用于对企业内员工需要加班时的申请审批</span>
          </div>
        <b-form @submit="onSubmit" v-if="show" >    
        <b-row>
                <b-col sm="3">
                  <b-form-group label="加班類型:">
                      <b-form-select :value="form.master.OVERTIME_DAYTYPE" :options="options.date" class="mb-3" required disabled/>
                  </b-form-group>
                </b-col>              
                <b-col sm="3">
                      <b-form-group label="加班日期:">
                        <b-form-input  :value="form.master.ATT_DATE" type="text" required readonly></b-form-input>
                      </b-form-group>
                </b-col>
       </b-row>
        <b-row>                    
                <b-col sm="3">    
                  <b-form-group label="加班時段(開始):">               
                    <b-form-input :value="form.master.SHIFT_BEGIN_TIME" type="text" required readonly/>                                        
                  </b-form-group>
                </b-col>
                <b-col sm="3">                   
                  <b-form-group label="加班時段(結束):">               
                    <b-form-input :value="form.master.SHIFT_END_TIME" type="text" required readonly/>                                        
                  </b-form-group>                  
                </b-col>   
                <b-col sm="3">                   
                  <b-form-group label="加班時數:">                  
                    <b-form-input type="text"  :value="form.master.OVERTIME_HOURS" required readonly/>                                         
                  </b-form-group>                  
                </b-col>                            
            </b-row>
            <b-row>
                <b-col sm="6">
                <b-form-group id="exampleGroup4" label="加班理由:">      
                    <b-form-textarea id="textarea1"
                        v-model="form.master.REMARK"
                        placeholder=""
                        :rows="3"
                        :max-rows="6"
                        required
                        readonly>
                  </b-form-textarea>              
                </b-form-group>
                </b-col>
            </b-row>
            <b-row>
            <b-col sm="12">
                  <b-form-group label="加班人員:">    
                  <!--  <b-table striped hover :items="form.items" :fields="fields"></b-table>  -->
                  <list-table :rows="form.items" :isReadonly="isReadonly"></list-table>
                  </b-form-group>            
            </b-col>          
            </b-row>               
            <wflow-signed-records :formNo="formNo"></wflow-signed-records>
            <wflow-sign-form :formNo="formNo"></wflow-sign-form>
          </b-form>           
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import * as moment from 'moment';
import { formatDate } from '@/utils/formatDate.js'
import { getOvertimesDetails } from '@/api/HR/getOvertimesDetails.js'
import { MessageBox } from 'element-ui'
import ListTable from '@/views/HR/ListTable'
import { WFlowSign,WFlowSignedRecords } from '@/views/WFlow/index.js'

export default {
  //props:['formNo'],
  data () {
    return {
      formNo:'',
      options: {
        date:[
                  { value: null, text: '請選擇加班時段' },
                  { value: '1', text: '平時加班' },
                  { value: '2', text: '假日加班' },
                  { value: '3', text: '國假加班' }
        ],
        begin:[
              [
                  { value: null, text: '請選擇[平時加班]開始時間' },
                  { value: '18:00', text: '18:00' }
              ],
              [
                  { value: null, text: '請選擇[假日加班]開始時間' },
                  { value: '08:00', text: '08:00' }
              ]
        ],
        end:[
              [
                  { value: null, text: '請選擇[平時加班]結束時間' },
                  { value: '19:00', text: '19:00' },
                  { value: '20:00', text: '20:00' },
                  { value: '21:00', text: '21:00' },
                  { value: '22:00', text: '22:00' }
              ],
              [
                  { value: null, text: '請選擇[假日加班]結束時間' },
                  { value: '17:30', text: '17:30' },
                  { value: '19:00', text: '19:00' },
                  { value: '20:00', text: '20:00' },
                  { value: '21:00', text: '21:00' },
                  { value: '22:00', text: '22:00' }
              ]
        ]
      },
      form: {
        master:{
            OVERTIME_NO: '',
            ATT_DATE: '',
            COMPANY_NO: '',
            FILLER_NAME: '',
            FILLER_EMP_NO: '',
            SHIFT_NO: '',//班別代號
            OVERTIME_DAYTYPE: '',
            SHIFT_BEGIN_TIME: '',
            SHIFT_END_TIME: '',
            OVERTIME_HOURS: '',
            WF_INSTANCE_STATUS: '',
            REMARK:''
        },
        items:[
            {
            OVERTIME_ITEM:'',
            EMP_NO: '',
            EMP_NAME: '',
            }
        ],
        signinfo:{
            form_no:"",
            sign_action:"2",//1:草稿 2:送審
            sign_note:"",
            act_sign_uid:this.$store.getters.uid
        }
      },
      fields: {OVERTIME_ITEM:{label:'項次'},EMP_NO:{label:'工號'},EMP_NAME:{label:'姓名'}},
      show: false,
      department: this.$store.state.user.branch_no
    }
  },
  components:{
    'list-table': ListTable,
    'wflow-sign-form': WFlowSign,
    'wflow-signed-records': WFlowSignedRecords
  },
  created () {
            this.formNo = this.$route.query.formNo;
            // 组件创建完后获取数据，
            this.fetchData()
  },
  computed:{
    isReadonly: function() {
      return true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form.signinfo));
      return
    },
    fetchData(){
        this.show = false
        getOvertimesDetails(this.formNo).then(response => {
            this.form.master = response.data.Data.MASTER
            this.form.master.ATT_DATE = moment(this.form.master.ATT_DATE).format('YYYY-MM-DD')
            this.form.items = response.data.Data.ITEMS
            this.form.signinfo.form_no = response.data.Data.MASTER.OVERTIME_NO
            this.form.signinfo.sign_note = response.data.Data.MASTER.REMARK
            this.show = true
        })
    }
  }
}
</script>