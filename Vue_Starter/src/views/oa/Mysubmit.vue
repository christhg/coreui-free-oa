<template>
  <b-container fluid> 
    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :striped="false"
             hover
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
    <!-- Search -->
    <b-form inline>  
        <b-form-group label="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-radio-group id="btnradios2"
                              buttons
                              button-variant="outline-primary"
                              size="md"
                              @input="fetchData(search.selected)"
                              v-model="search.selected"
                              :options="search.options"
                              name="radioBtnOutline" />
        </b-form-group>               
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input v-model="filter" placeholder="過濾條件" />
          <b-input-group-append>
            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
          </b-input-group-append>        
        </b-input-group>
        
    </b-form>    
    <b-form inline>
      <small class="mb-2 mr-sm-2 mb-sm-0"><i class="icon-star"></i> 默認我的申請，只可查詢30天內的文件，超過30天以上請至歷史申請查詢頁面。</small>
    </b-form>
      <!-- User Interface controls --> 
    </template>   
    <!-- A virtual column -->
      <template slot="index" slot-scope="row">{{row.index +1}}</template>       
      <template slot="FORM_NO" slot-scope="row">{{row.value}}</template>
      <template slot="FORM_KIND_NAME" slot-scope="row">{{row.value}}</template>
      <template slot="USERNAME" slot-scope="row">{{row.value}}</template>
      <template slot="FORM_STATUS" slot-scope="row">
        <span v-if="row.value === 'A'" class="text-primary">{{ display(row.value) }}</span>
        <span v-else-if="row.value === 'P'" class="text-success">{{ display(row.value) }}</span>      
        <span v-else>{{ display(row.value) }}</span>      
      </template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
         <div v-if="row.item.FORM_STATUS === 'H'">
              <b-button  variant="danger" size="sm" @click.stop="reView(row.item.FORM_KIND_ID,row.item.FORM_NO)" class="mr-1">
              <i class="fa fa-star"></i>&nbsp; 編輯(Edit)
              </b-button>            
        </div>
        <div v-else-if="row.item.FORM_STATUS === 'A'">
              <b-button  variant="outline-primary" size="sm" @click.stop="reView(row.item.FORM_KIND_ID,row.item.FORM_NO)" class="mr-1">
              <i class="fa fa-star"></i>&nbsp; 查看(Review)
              </b-button>
              <!--催簽-->
              <wflow-urgr-button :kindId="row.item.FORM_KIND_ID" :formNo="row.item.FORM_NO"></wflow-urgr-button>
              <!--流程-->
              <b-button variant="secondary" size="sm" @click.stop="row.toggleDetails">
              <i class="fa icon-eyeglass"></i>&nbsp; 流程({{ row.detailsShowing ? 'Hide' : 'Show' }})
              </b-button>
        </div>
        <div v-else-if="row.item.FORM_STATUS === 'P'">  
              <b-button  variant="outline-primary" size="sm" @click.stop="reView(row.item.FORM_KIND_ID,row.item.FORM_NO)" class="mr-1">
              <i class="fa fa-star"></i>&nbsp; 查看(Review)
              </b-button>        
        </div>
      </template>

      <!-- Steps -->
      <template slot="row-details" slot-scope="row">  
        <b-card>          
          <my-steps :formId="row.item.FORM_KIND_ID" :companyId="row.item.PUB_COMPANY_ID" :formNo="row.item.FORM_NO"></my-steps>
        </b-card>
      </template>    
  </b-table>
    <!-- Pagination -->
  <b-row>
    <b-col md="4" class="my-1">
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>       
         
  </b-row>
  </b-container>
</template>

<script>
const items = []
import {  MessageBox } from 'element-ui';
import { getWaitingLists } from '@/api/wflow/getWaitingLists' // 獲取送審中+草稿清單
import MySteps from '@/views/OA/MySteps' // 顯示簽核步驟狀態
import { WFlowUrge } from '@/views/WFlow/index.js'
import { review } from '@/utils/review.js' // 表單檢視路由

import SearchBoxInline from '@/views/components/SearchBoxInline'

export default {
  data () {
    return {
      items: [],
      fields: [
        'index',
        { key: 'FORM_NO', label: '表單號', sortable: true, sortDirection: 'desc' },
        { key: 'FORM_KIND_NAME', label: '表單名稱', sortable: true, },
        { key: 'COMPANY_NAME', label: '公司名稱' },
        { key: 'USERNAME', label: '申請人' },
        { key: 'CREATED_AT', label: '申請日期', sortable: true, sortDirection: 'desc' },
        { key: 'FORM_STATUS', label: '表單狀態' },
        { key: 'actions', label: '動作' }
      ],
      currentPage: 1,
      perPage: 8,
      totalRows: items.length,
      pageOptions: [ 10, 20, 50 ],
      sortBy: 'CREATED_AT',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      modalInfo: { title: '', content: '' },
      instance:{
        rows:[]
      },
      // 查詢radio
      search:{
        selected: 1,
        options: [
          { value: '1', text: '草稿中' },
          { value: '2', text: '送審中' },
          { value: '3', text: '已結案' }
        ]
      }
    }
  },
  components:{
    'my-steps': MySteps,
    'wflow-urgr-button': WFlowUrge,
    'my-searchbox': SearchBoxInline
  },
  created(){
    this.fetchData() // 默認:送審中
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
    display (value) {
      switch(value)
      {
        case 'A':
          return '送審中'
          break;
        case 'H':
          return '草稿中'
          break
        case 'P':
          return '已結案'
          break
      }
    },
    reView (formKindId,formNo) {
      let that = this.$router
       review(that,formKindId,formNo)
    },
    fetchData () {
      getWaitingLists(this.$store.getters.uid,this.search.selected).then(response =>{
          this.items = response.data.Data
      })
    }
  }
}
</script>