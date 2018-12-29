<template>
  <div>
  <b-row>
    <b-col sm="8" class="mx-auto">
      <b-card class="card-accent-primary">    
          <div slot="header" class="my-3">
            <h4><strong>加班申請單</strong> - {{form.master.OVERTIME_NO}}</h4>
            <span>加班申请流程用于对企业内员工需要加班时的申请审批</span>
          </div>
          <b-form @submit="onSubmit" ref="overtimeForm"> 
              <b-row>
                      <b-col sm="3">
                        <b-form-group label="加班類型:">
                            <b-form-select v-model="form.master.OVERTIME_DAYTYPE" :options="options.date" class="mb-3" required/>
                        </b-form-group>
                      </b-col>              
                      <b-col sm="3">
                            <b-form-group label="加班日期:">
                              <b-form-input  v-model="form.master.ATT_DATE" type="date" required></b-form-input>
                            </b-form-group>
                      </b-col>   
                      <b-col sm="3">
                            <b-form-group label="班別:">
                              <b-form-select v-model="form.master.SHIFT_NO" :options="options.shift" class="mb-3" required/>
                            </b-form-group>
                      </b-col>                                 
              </b-row>

              <b-row>                    
                <b-col sm="3">    
                  <b-form-group label="加班時段(開始):">               
                    <b-form-select v-model="form.master.SHIFT_BEGIN_TIME" :options="options.begin[form.master.OVERTIME_DAYTYPE-1]" required/>                                        
                  </b-form-group>
                </b-col>
                <b-col sm="3">                   
                  <b-form-group label="加班時段(結束):">               
                    <b-form-select v-model="form.master.SHIFT_END_TIME" :options="options.end[form.master.OVERTIME_DAYTYPE-1]" required/>                                        
                  </b-form-group>                  
                </b-col>   
                <b-col sm="3">                   
                  <b-form-group label="加班時數:">                  
                    <b-form-input type="text"  :value="hours" required readonly/>                                         
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
                          required>
                    </b-form-textarea>              
                  </b-form-group>
                  </b-col>
              </b-row>

              <b-row>
                <b-col sm="12">
                      <b-form-group label="加班人員:">    
                      <!--  <b-table striped hover :items="form.items" :fields="fields"></b-table>  -->
                      <b-form-select size="lm" class="mb-3" multiple :select-size="5" v-model="empSelected" :options="empOptions"></b-form-select>
                    
                      <list-table :rows="form.items" :isReadonly="isReadonly"></list-table>
                      </b-form-group>            
                </b-col>          
              </b-row>
                <!-- 提交框 -->
                  <wflow-send ref="child"></wflow-send>                   
          </b-form>         
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import * as moment from 'moment'
import { formatDate } from '@/utils/formatDate.js'
import { compareDate } from '@/utils/compareTime.js'
import { postOvertimes } from '@/api/HR/postovertimes.js'
import { postOvertimesSign } from '@/api/HR/postOvertimesSign.js'
import { getOvertimesNo } from '@/api/HR/getOvertimesNo.js'
import { getOrgsPnodeEmps } from '@/api/Orgs/getOrgsPnodeEmps.js'
import { Message, MessageBox } from 'element-ui'
import ListTable from '@/views/HR/ListTable.vue'
import { WFLowSend } from '@/views/WFlow/index.js'

export default {
  data () {
    return {
      empSelected:[],
      empOptions: [
          { value: null, text: 'Please select some item' },
          { value: {"VALUE": "D29787","TEXT": "王定良"}, text: '王定良' },
          { value: {"VALUE": "D34300","TEXT": "陳琴"}, text: '陳琴' },
          { value: {"VALUE": "D34663","TEXT": "李賢欽"}, text: '李賢欽' },
          { value: {"VALUE": "D09101","TEXT": "任雪芹"}, text: '任雪芹' }
      ],
      options: {
        shift:[
                  { value: null, text: '請選擇班別' },
                  { value: '正常班', text: '正常班' }
        ],
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
          COMPANY_NO: this.$store.state.user.fact_no,
          FILLER_NAME: this.$store.getters.name,
          FILLER_EMP_NO: this.$store.getters.emp_no,
          SHIFT_NO: '',//班別代號
          OVERTIME_DAYTYPE: 1,
          SHIFT_BEGIN_TIME: "08:00",
          SHIFT_END_TIME: "17:30",
          OVERTIME_HOURS: 0,
          //WF_INSTANCE_STATUS: '',//H:草稿 A:送審
          REMARK:""
        },
        items:[
            {
            OVERTIME_ITEM:'',
            EMP_NO: this.$store.getters.emp_no,
            EMP_NAME: this.$store.getters.name,
            //BEGIN_TIME: 'this.beginTime',
            //END_TIME: 'this.endTime',
            //OVERTIME_HOURS: 0
            }
        ],
        signinfo:{
          uums_form_kind_id:102,
          pub_company_id:this.$store.getters.pub_company_id,
          form_no:"",
          sign_action:"",//1:草稿 2:送審
          sign_note:"",
          act_sign_uid:this.$store.getters.uid
        }
      },
      fields: {OVERTIME_ITEM:{label:'項次'},EMP_NO:{label:'工號'},EMP_NAME:{label:'姓名'}},
      department: this.$store.state.user.branch_no,
      timespan:0
    }
  },
  components:{
    'list-table': ListTable,
    'wflow-send': WFLowSend
  },
  watch:{
    empSelected:function(){
      this.form.items = []
      let o = {OVERTIME_ITEM:'',EMP_NO: this.$store.getters.emp_no, EMP_NAME: this.$store.getters.name}
      this.form.items.push(o)
      //
      let l = this.empSelected.length
      if( l===0 ) return
      for(var i=0;i<l;i++){
        let s = this.empSelected[i]
        if(s.VALUE === this.$store.getters.emp_no) continue
        let o = {OVERTIME_ITEM:'',EMP_NO: s.VALUE, EMP_NAME: s.TEXT}
        this.form.items.push(o)
      }
    }
  },
  created() {
    this.fetchData()
    this.fetchNodeEmps()
  },
  filters: {
    datefilter: function (value) {
      if (!value) return ''
      return formatDate(value, "yyyyMMdd");
    }
  },
  computed:{
    isReadonly: function() {
      return false
    },
    hours: function(){
       var m1 = moment(this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_BEGIN_TIME)
       var m2 = moment(this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_END_TIME)
       var du = moment.duration(m2 - m1, 'ms')
       return typeof NaN === du.get('hours') ? 0 : du.get('hours') ;
    }
    // beginTime: function(value){
    //         var date = new Date(this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_BEGIN_TIME);
    //         return formatDate(date, "yyyy-MM-dd hh:mm");
    // },
    // endTime: function(value){
    //         var date = new Date(this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_END_TIME);
    //         return formatDate(date, "yyyy-MM-dd hh:mm");
    // }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      //01.判斷條件
      let today = formatDate(new Date(),'yyyy-MM-dd')
      let overday = formatDate(new Date(this.form.master.ATT_DATE),'yyyy-MM-dd')
      if(!compareDate(today,overday))
      {
        Message.error('加班时间不能小于今天')
        return
      }
      //02.增加項次
      this.form.items.map(function(value,index,array){
        array[index].OVERTIME_ITEM = index +1
      })
      //03.加班時數
      this.form.master.OVERTIME_HOURS = this.hours
      this.form.signinfo.sign_note = this.form.master.REMARK
      //04.時間格式
      this.form.master.SHIFT_BEGIN_TIME = this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_BEGIN_TIME
      this.form.master.SHIFT_END_TIME = this.form.master.ATT_DATE + ' ' + this.form.master.SHIFT_END_TIME
      //05.子組件提交表單
      //alert(JSON.stringify(this.form))
      this.$refs.child.onPost(this.form)
    },
    fetchData() {
        getOvertimesNo('102',this.$store.getters.pub_company_id)
        .then(response =>{
          if(response.data.Status == 200){
              this.form.master.OVERTIME_NO = response.data.Data
              this.form.signinfo.form_no = response.data.Data
          }
        })
        .catch()
    },
    emptyRow: function(){
        this.form.items = []
        let o = {OVERTIME_ITEM:'',EMP_NO: this.$store.getters.emp_no, EMP_NAME: this.$store.getters.name}
        this.form.items.push(o)
    },
    fetchNodeEmps(){
      getOrgsPnodeEmps(this.$store.getters.pub_company_id,this.$store.getters.up_org_node_no)
      .then(response => {
        this.empOptions = response.data.Data
      })
      .catch()
    },
    showChild(info){
      //alert(JSON.stringify(info))
      this.action = info.action
      this.flowType = info.flowType
      this.onSubmit()
    }
  }
}
</script>