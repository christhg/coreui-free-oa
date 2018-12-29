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
        <!-- User Interface controls -->
            <!-- Search component -->
            <my-searchbox v-on:filter="filterChange"></my-searchbox>     
    </template>
    <!-- A virtual column -->
      <template slot="index" slot-scope="row">{{row.item.ROW_NO}}</template>       
      <template slot="FORM_NO" slot-scope="row">{{row.value}}</template>
      <template slot="FORM_KIND_NAME" slot-scope="row">{{row.value}}</template>
      <template slot="USERNAME" slot-scope="row">{{row.value}}</template>
      <template slot="FORM_STATUS" slot-scope="row">{{ display(row.value) }}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
              <b-button  variant="outline-primary" size="sm" @click.stop="reView(row.item.FORM_NO)" class="mr-1">
              <i class="fa fa-star"></i>&nbsp; 查看(Review)
              </b-button>
              <b-button variant="primary" size="sm" @click.stop="row.toggleDetails">
              <i class="fa icon-eyeglass"></i>&nbsp; 流程({{ row.detailsShowing ? 'Hide' : 'Show' }})
              </b-button>           
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>          
          <my-steps :formId="row.item.FORM_KIND_ID" :companyId="row.item.PUB_COMPANY_ID" :formNo="row.item.FORM_NO"></my-steps>
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
import MySteps from '@/views/OA/MySteps'
import { MessageBox } from 'element-ui';
import { getWaitingLists } from '@/api/wflow/getWaitingLists'

import SearchBoxInline from '@/views/components/SearchBoxInline'

export default {
  data () {
    return {
      items: [],
      fields: [
        'index',
        { key: 'FORM_NO', label: '表單號', sortable: true, sortDirection: 'desc' },
        { key: 'FORM_KIND_NAME', label: '表單名稱', sortable: true },
        { key: 'COMPANY_NAME', label: '公司名稱' },
        { key: 'USERNAME', label: '簽核者' },
        { key: 'CREATED_AT', label: '申請日期', sortable: true, sortDirection: 'desc' },
        { key: 'FORM_STATUS', label: '表單狀態' },
        { key: 'actions', label: '動作' }
      ],
      currentPage: 1,
      perPage: 8,
      totalRows: items.length,
      pageOptions: [ 10, 30, 50 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  components:{
    'my-steps':MySteps,
    'my-searchbox': SearchBoxInline
  },
  created(){
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
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    display(value){
      switch(value)
      {
        case 'A':
        return '送審中'
        break;
        case 'P':
        return '已結案'
        case 'Z':
        return '已作廢'
        break;
      }
    },
    reView (value) {
      //this.$router.push({ name: 'OvertimeView', params: { formNo: value }})
      this.$router.push({ path: '/HR/OvertimeView', query: { formNo: value }})
    },
    fetchData() {
      getWaitingLists(this.$store.getters.uid,5).then(response =>{
          console.log(response.data.Data)
          this.items = response.data.Data
      }).catch(err =>{
          // MessageBox.alert('錯誤發生了!!')
      })
    },
    filterChange(value){
      this.filter = value
    }
  }
}
</script>