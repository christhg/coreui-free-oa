<template>
  <b-container fluid>


    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :striped="true"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
             caption-top
    >
    <template slot="table-caption">
      <h4 class="text-primary">用戶清單列表</h4>
    </b-row>      
    </template>
    <!-- A virtual column -->
    <template slot="index" slot-scope="row">
      {{row.index + 1}}
    </template>       
      <template slot="EMP_NO" slot-scope="row">{{row.value}}</template>
      <template slot="EMP_NAME" slot-scope="row">{{row.value}}</template>
      <!--<template slot="PERSONAL_ID" slot-scope="row">{{row.value}}</template>
      <template slot="HOME_ADDRESS" slot-scope="row">{{row.value}}</template>-->
      <template slot="ORG_NODE_NO" slot-scope="row">{{row.value}}</template>
      <template slot="ORG_NODE_NAME" slot-scope="row">{{row.value}}</template>
      <template slot="JOB_TITLE" slot-scope="row">{{row.value}}</template>
      <template slot="LDAP_UID" slot-scope="row">{{row.value}}</template>
      <template slot="CREATED_AT" slot-scope="row">{{row.value}}</template>                  
      <template slot="actions" slot-scope="row">
              <b-button  variant="primary" size="sm" @click.stop="reView(row.item.FORM_NO)" class="mr-1">
              <i class="fa fa-star"></i>&nbsp; 編輯(Approve)
              </b-button>                   
      </template>
      <template slot="row-details" slot-scope="row">  
        <b-card>          

        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="4" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>     
    </b-row>

  </b-container>
</template>

<script>
const items = []

import { MessageBox } from 'element-ui';
import { getOrgsEmps } from '@/api/Orgs/getOrgsEmps.js'
export default {
  data () {
    return {
      items: [],
      fields: [
        'index',
        { key: 'EMP_NO', label: '工號', sortable: true, sortDirection: 'desc' },
        { key: 'EMP_NAME', label: '姓名', sortable: true },
        //{ key: 'PERSONAL_ID', label: '證件號' },
        //{ key: 'HOME_ADDRESS', label: '住址' },
        { key: 'ORG_NODE_NO', label: '部門代號', sortable: true, sortDirection: 'desc' },
        { key: 'ORG_NODE_NAME', label: '部門名稱' },
        { key: 'JOB_TITLE', label: '職務名稱' },
        { key: 'LDAP_UID', label: 'UID帳號' },
        { key: 'CREATED_AT', label: '建立日期' },
        { key: 'actions', label: '動作' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [ 10, 20, 50 ],
      sortBy: 'CREATED_AT',
      sortDesc: true,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  components:{

  },
  created() {
    this.fetchData()
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    reView (value) {
      // this.$router.push({ path: '/HR/OvertimeApprove', query: { formNo: value} })
    },
    fetchData(){
        getOrgsEmps (200, 1, 400)
        .then(response =>{
            this.items = response.data.Data
        })
        .catch()
    }
  }
}
</script>