<template>
<b-row>
    <b-col sm="8" style="margin:0 auto">
        <b-card >
          <div slot="header">
            <strong>編輯部門組織負責人</strong>
          </div>
         <b-form @submit="onSubmit" > 
          <b-form-group validated label="組織節點">
            <b-form-input v-model="form.ORG_NODE_NO" type="text" placeholder="" required></b-form-input>
          </b-form-group>
          <b-form-group validated label="組織節點名稱">
            <b-form-input v-model="form.ORG_NODE_NAME" type="text" placeholder="" required></b-form-input>
          </b-form-group>
          <b-form-group label="負責人工號">
            <!--<b-form-select v-model="form.MGR_EMP_NO" :options="optionsEmp" placeholder="sssss" required></b-form-select>-->
            <b-form-input v-model="form.MGR_EMP_NO"  type="text" placeholder="" required></b-form-input>            
          </b-form-group>
          <b-form-group label="上層組織節點">
            <b-form-select v-model="form.UP_ORG_NODE_NO" :options="optionsUp" placeholder="xxxxxx" required></b-form-select>
          </b-form-group>                              
          <div slot="footer">
                <b-row>
                  <b-col sm="6">
                  <b-form-group>                    
                      <b-button type='submit' variant="primary" class="btn-block">提交</b-button>                                                 
                  </b-form-group>
                  </b-col>                                                                      
              </b-row>
          </div>
          </b-form>
        </b-card>
    </b-col>
</b-row>
</template>
<script>
import { MessageBox } from 'element-ui'
import { getOrgsNode } from '@/api/Orgs/getOrgsNode.js'
import { getPagesEmps } from '@/api/Orgs/getPagesEmps.js'
import { getOrgsNodeEmps } from '@/api/Orgs/getOrgsNodeEmps.js'
import { getOrgsNodeList } from '@/api/Orgs/getOrgsNodeList.js'

export default {
    data(){
        return {
            form:{
                PUB_COMPANY_ID: '',
                ORG_NODE_NO:'',
                ORG_NODE_NAME:'',
                MGR_EMP_NO:'',
                UP_ORG_NODE_NO:''
            },
            optionsEmp:[
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' }
            ],
            optionsUp:[
                { value: 'B4', text: '資訊部' },
                { value: 'A3', text: '關務部' }
            ]
        }
    },
    created(){
        //this.PUB_COMPANY_ID = this.$store.getters.pub_company_id
        //this.ORG_NODE_NO = this.$route.query.nodeNo
        this.fetchNode()
        this.fetchNodeEmps()
        this.fetchNodeList()
    },
    methods:{
        onSubmit (evt) {
           evt.preventDefault()
           alert(JSON.stringify(this.form))
        },
        fetchNode(){
            getOrgsNode(this.$store.getters.pub_company_id,this.$route.query.nodeNo).then( response => {
                // console.log(response.data.Data)
                let model = response.data.Data
                this.form = model
                // this.ORG_NODE_NO = model.ORG_NODE_NO
                // this.ORG_NODE_NAME = model.ORG_NODE_NAME
                // this.MGR_EMP_NO = model.MGR_EMP_NO == null ? '-' : model.MGR_EMP_NO
                // this.MGR_EMP_NAME = model.MGR_EMP_NAME  == null ? '-' : model.MGR_EMP_NAME
                // this.UP_ORG_NODE_NO = model.UP_ORG_NODE_NO
            })
            .catch(error=> {
                MessageBox.alert(error)
            })
        },
        fetchNodeEmps(){
            getOrgsNodeEmps(this.$store.getters.pub_company_id,this.$route.query.nodeNo)
            .then(response => {
                this.optionsEmp = response.data.Data
            })
            .catch()
        },
        fetchNodeList(){
            getOrgsNodeList(this.$store.getters.pub_company_id)
            .then(response=>{
                this.optionsUp = response.data.Data
            })
            .catch()
        }
    }
}
</script>