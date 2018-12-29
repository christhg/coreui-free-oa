<template>
<div>

    <b-container v-show="!isMobile" fluid>
        <span>待審核筆數(Total)：{{ items.length }}</span>
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
      </b-row>      
      </template>
      <!-- A virtual column -->
      <template slot="index" slot-scope="row">
        {{row.index + 1}}
      </template>       
        <template slot="FORM_NO" slot-scope="row">{{row.value}}</template>
        <template slot="FORM_KIND_NAME" slot-scope="row">{{row.value}}</template>
        <template slot="CREATED_NAME" slot-scope="row">{{row.value}}</template>      
        <template slot="Actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <!--
          <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
            Info modal
          </b-button>
          <b-button size="sm" @click.stop="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
          -->
                <b-button  variant="primary" size="sm" @click.stop="reView(row.item.FORM_NO)" class="mr-1">
                <i class="fa fa-star"></i>&nbsp; 審核(Approve)
                </b-button>
                <!--
                <b-button variant="secondary" size="sm" @click.stop="row.toggleDetails">
                <i class="fa icon-eyeglass"></i>&nbsp; 流程({{ row.detailsShowing ? 'Hide' : 'Show' }})
                </b-button>
                -->        
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

    <b-container v-show="isMobile">
    <span>待審核筆數(Total)：{{ items.length }}</span>
    <b-card  v-for="(item,index) in items" :key="index"
        class="card-accent-primary"
        bg-variant="white" 
        text-variant="dark" 
        :title="item.FORM_KIND_NAME + item.FORM_NO"               
        :footer="'(' + (index +1) + ') ' +item.CREATED_AT+' 申請人:'+item.CREATED_NAME"
        footer-tag="footer">
        <b-button variant="primary" :class="isMobile? 'btn-block':'btn-200'" @click.stop="reView(item.FORM_NO)">審核(Approve)</b-button>       
    </b-card> 
    </b-container>    
<span style="display:flex;justify-content:center;align-items:center;">- 已加載所有資料 -</span>
<hr>
</div>

</template>

<script>
const items = []

import { MessageBox } from 'element-ui';
import { getWaitingLists } from '@/api/wflow/getWaitingLists'
import MySteps from '@/views/OA/MySteps'

export default {
  data () {
    return {
      items: [],
      fields: [
        'index',
        { key: 'FORM_NO', label: '表單號', sortable: true, sortDirection: 'desc' },
        { key: 'FORM_KIND_NAME', label: '表單名稱', sortable: true },
        { key: 'COMPANY_NAME', label: '公司名稱' },
        { key: 'CREATED_NAME', label: '申請者' },
        { key: 'CREATED_AT', label: '申請日期', sortable: true, sortDirection: 'desc' },
        { key: 'Actions', label: '動作' }
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
    'my-steps': MySteps
  },
  created() {
    this.fetchData()
  },
  mounted () {
    this.$store.commit('ON_RESIZE')
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
    isMobile(){
      // return this.screenWidth<400?true:false
      return this.$store.getters.ismobile
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
    display (value) {
      switch (value) {
        case 'A':
          return '待審中'
        case 'P':
          return '已結案'
      }
    },
    reView (value) {
      // alert(value)
      // this.$router.push({ name: '加班單審批', params: { formNo: value },query: { id: value} })
      this.$router.push({ path: '/HR/OvertimeApprove', query: { formNo: value } })
    },
    fetchData () {
      getWaitingLists(this.$store.getters.uid, 4).then(response => {
        // console.log(response.data.Data)
        this.items = response.data.Data
      }).catch(error => {
        MessageBox.alert('錯誤發生了!!' + error)
      })
    }
  }
}
</script>
