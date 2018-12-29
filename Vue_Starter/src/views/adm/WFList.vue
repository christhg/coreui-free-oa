<template>
<div>
    <b-form inline>
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0 ">
            <b-input v-model="searchtxt" type="text" placeholder="部門代號,名稱"></b-input>            
            <b-input-group-append>
                <b-btn :disabled="false" @click="searchData"><i class="icon-magnifier"></i>查詢</b-btn>
            </b-input-group-append> 
            <b-input-group-append>
                <b-btn variant="primary" @click="searchtxt = ''">Clear</b-btn>
            </b-input-group-append>                       
        </b-input-group>
    </b-form>    
    <hr>
    <v-table
            :is-loading="isLoading"
            is-horizontal-resize
            style="width:100%"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            is-vertical-resize
            :vertical-resize-offset='60'
            :multiple-sort="false"
            :min-height="350"
            even-bg-color="#f2f2f2"
            :title-rows="tableConfig.titleRows"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            @sort-change="sortChange"
            :paging-index="pageIndex"            
    ></v-table>
    <div class="mt20 mb20 bold"></div>
        <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableConfig.total" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
    </div>  
</div>         
</template>

<script>
import { MessageBox } from 'element-ui';
import { getPagesWFlowSettings } from '@/api/WFlow/getPagesWFlowSettings.js'
//import { putOrgsEmps } from '@/api/Orgs/putOrgsEmps.js'

export default {
  data () {
    return {
          pageIndex:1,
          pageSize:10,
          tableConfig: {
                        total:0,
                        multipleSort: false,
                        tableData: [],
                        columns:  [
                                {field: 'UUMS_FORM_KIND_ID', title:'流程表單編號', width: 20, titleAlign: 'center',columnAlign:'center',isEdit:false,
                                formatter: function (rowData,rowIndex,pagingIndex,field) {
                                      return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                                },isResize:true},
                                {field: 'FLOW_COND_DESC', title: '流程條件名稱', width: 120, titleAlign: 'center',columnAlign:'left',isEdit:false,isResize:true},
                                {field: 'FLOW_COND_NO', title: '流程條件代號', width: 20, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                                {field: 'FLOW_COND_EXPR', title: '流程條件表達式', width: 400, titleAlign: 'center',columnAlign:'left',isEdit:true,
                                formatter: function (rowData,rowIndex,pagingIndex,field) {
                                      return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                                },isResize:true,
                                isResize:true,titleCellClassName:'title-cell-class-name-test',columnCellClassName:'column-cell-class-name-test'},
                                {field: 'STEP_Z_ADD_UID_STR', title: '流程簽核字串', width: 200, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true},
                                {field: 'CREATED_AT', title: '建立日期', width: 60, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                                {field: 'UPDATED_AT', title: '更新日期', width: 60, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true}
                        ]
          },
          isLoading: false,
          searchtxt:''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    pageChange(pageIndex){
          this.pageIndex = pageIndex;
          this.getTableData();
          console.log(pageIndex)
    },
    pageSizeChange(pageSize){
        // this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
    },
    sortChange(params){
        if (params.height.length > 0){
            this.tableConfig.tableData.sort(function (a, b) {
                if (params.height === 'asc'){
                    return a.height - b.height;
                }else if(params.height === 'desc'){
                        return b.height - a.height;
                }else{
                    return 0;
                }
            });
        }
    },
    getTableData(){
        //this.tableConfig.tableData = tableDate.slice((this.pageIndex-1)*this.pageSize,(this.pageIndex)*this.pageSize)
        this.isLoading = true;
        getPagesWFlowSettings (200,this.pageIndex,this.pageSize)
        .then(response =>{
            this.tableConfig.tableData = response.data.Data.tableData
            this.isLoading = false;
        })
        .catch()
    },
    fetchData(){
        this.isLoading = true;
        getPagesWFlowSettings (200, this.pageIndex,this.pageSize).then(response =>{
            this.tableConfig.total = response.data.Data.total
            this.tableConfig.tableData = response.data.Data.tableData
            this.isLoading = false;
        })
    },
    // 单元格编辑回调
    cellEditDone(newValue,oldValue,rowIndex,rowData,field){

        this.tableConfig.tableData[rowIndex][field] = newValue
        let row = this.tableConfig.tableData[rowIndex]
        // 接下来处理你的业务逻辑，数据持久化等..........................
        // alert(JSON.stringify(row))
        //更新
        this.isLoading = false
        // putOrgsEmps(row).then(
        //   res => {
        //     this.isLoading = false
        //   }
        // ).catch()
    }
  }
}
</script>
<style>
    .cell-edit-color{
        color:#2db7f5;
        font-weight: bold;
    }
    .title-cell-class-name-test{
        background-color: #f60;
        color:#fff;
    }
    .column-cell-class-name-test{
        background-color: #2db7f5;
    }    
</style>