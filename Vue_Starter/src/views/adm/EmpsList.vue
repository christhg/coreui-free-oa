<template>
<div>
    <b-form inline>
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0 ">
            <b-input v-model="searchtxt" type="text" placeholder="工號,姓名"></b-input>            
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
        <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableConfig.total" :pageIndex="pageIndex" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
    </div>  
</div>         
</template>

<script>
import { MessageBox } from 'element-ui';
import { getPagesEmps, getPagesEmpsBySearch } from '@/api/Orgs/getPagesEmps.js'
// import { getOrgsEmpsTotal } from '@/api/Orgs/getOrgsEmpsTotal.js'
import { putOrgsEmp } from '@/api/Orgs/putOrgsEmp.js'

export default {
  data () {
    return {
          pageIndex:1,
          pageSize:10,
          tableConfig: {
                        total:0,
                        multipleSort: false,
                        tableData: [
                          {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                          {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                          {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                          {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                          {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                        ],
                        columns:  [
                                {field: 'EMP_NO', title:'工號', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:false,
                                formatter: function (rowData,rowIndex,pagingIndex,field) {
                                      return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                                },isResize:true},
                                {field: 'EMP_NAME', title: '姓名', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                                {field: 'ORG_NODE_NO', title: '部門代號', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                                {field: 'ORG_NODE_NAME', title: '部門名稱', width: 100, titleAlign: 'center',columnAlign:'left',isEdit:false,isResize:true},
                                {field: 'JOB_TITLE', title: '職稱', width: 80, titleAlign: 'center',columnAlign:'left',isEdit:false,isResize:true},
                                {field: 'LDAP_UID', title: 'UID帳號', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:true,
                                isResize:true,titleCellClassName:'title-cell-class-name-test',columnCellClassName:'column-cell-class-name-test'},
                                {field: 'CREATED_AT', title: '建立日期', width: 100, titleAlign: 'center',columnAlign:'left',isEdit:false,isResize:true}
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
    pageChange (pageIndex){
          this.pageIndex = pageIndex;
          this.getTableData();
    },
    pageSizeChange (pageSize){
        // this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
    },
    sortChange (params){
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
    getTableData (){
        //this.tableConfig.tableData = tableDate.slice((this.pageIndex-1)*this.pageSize,(this.pageIndex)*this.pageSize)
        if(this.searchtxt === '') {
            this.isLoading = true;
            getPagesEmps (200,this.pageIndex,this.pageSize)
            .then(response =>{
                this.tableConfig.tableData = response.data.Data.tableData
                this.isLoading = false;
            })
        } else {
            this.isLoading = true;
            getPagesEmpsBySearch (200, this.pageIndex, this.pageSize, this.searchtxt).then(response =>{
                this.tableConfig.total = response.data.Data.total
                this.tableConfig.tableData = response.data.Data.tableData
                this.isLoading = false;
            })
        }

    },
    fetchData (){
        this.isLoading = true;
        getPagesEmps (200, 1,this.pageSize).then(response =>{
            this.tableConfig.total = response.data.Data.total
            this.tableConfig.tableData = response.data.Data.tableData
            this.isLoading = false;
        })
        // getOrgsEmpsTotal (200).then(response => {
        //     this.tableConfig.total = response.data.Data
        // })
        // var p1 = getOrgsEmpsTotal (200)
        // var p2 = getOrgsEmps (200, this.pageIndex,this.pageSize)
        // p1
        // .then(response => { this.tableConfig.total = response.data.Data })
        // .then(p2.then(response => {
        //     this.tableConfig.tableData = response.data.Data
        // }))
        // .then(() => {
        //     this.isLoading = false;
        // })
        // .catch(error => {
        //     alert(error)
        // })

        // let that = this
        // // 同时执行p1和p2，并在它们都完成后执行then:
        // Promise.all([p2]).then(function (results) {
        //     //console.log(results[0].data.Data); // 获得一个Array: results = ['P1', 'P2']
        //     //console.log(results[1].data.Data); // 获得一个Array: results = ['P1', 'P2']
        //     //that.tableConfig.total = results[0].data.Data
        //     that.tableConfig.tableData = results[0].data.Data
        //     that.isLoading = false;
        // })
        // .catch(error => {
        //   alert(error)
        // })
    },
    searchData (){
        this.pageIndex = 1 // 第一筆開始查詢
        if(this.searchtxt === '') {
            this.fetchData()
            return
        }
        this.isLoading = true;
        getPagesEmpsBySearch (200,this.pageIndex, this.pageSize, this.searchtxt).then(response =>{
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
        this.isLoading = true
        putOrgsEmp(row).then(
          res => {
            this.isLoading = false
          }
        ).catch()
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