<template>
  <div class="app-container">

    <tree-table :data="filesdata" :columns="columns" border/>

  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import { Tag } from 'element-ui'
import treeTable from '@/views/components/TreeTable'
import { getFilesTree } from '@/api/DCC/getFilesTree.js'

export default {
  name: 'TreeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '目錄',
          value: 'label',
          width: 200
        },
        {
          text: '文件編號',
          value: 'fileno'
        },
        {
          text: '文件名稱',
          value: 'filename',
          width: 400
        },
        {
          text: '大小',
          value: 'size'
        },
        {
          text: '版本',
          value: 'ver'
        },
        {
          text:'文件類型',
          value:'type'
        },
        {
          text: '建立時間',
          value: 'created'
        },
        {
          text: '備註',
          value: 'comment'
        }
      ],
      data: [
        {
          id: 0,
          no: 'DCC01',
          label: '(一階)質量手冊',
          size: '',
          ver:'',
          type:'',
          created:'',
          comment: ''
        },
        {
          id: 1,
           no: 'DCC02',
          label: '(二階)程序文件',
          size: '',
          ver:'',
          type:'',
          created:'',
          comment: '',
          children: [
            {
              id: 2,
              no: 'DCC0201',
              label: '事件2',
              size: 10,
              ver:'',
              type:'',
              created:'',
              comment: '无'
            },
            {
              id: 3,
              no: 'DCC0202',
              label: '事件3',
              size: '',
              ver:'',
              type:'',
              created:'',
              comment: '无',
              children: [
                {
                  id: 4,
                  no: 'DCC020201',
                  label: '事件4',
                  size: 5,
                  ver:'',
                  type:'',
                  created:'',
                  comment: '无'
                },
                {
                  id: 5,
                  no: 'DCC020202',
                  label: '事件5',
                  size: 10,
                  ver:'',
                  type:'',
                  created:'',
                  comment: '无'
                }
              ]
            }
          ]
        }
      ],
      filesdata: []
    }
  },
  created() {
          this.fetchData()
  },
  methods: {
    fetchData() {
      getFilesTree(this.$store.getters.pub_company_id).then(
        response => {
          console.log(response.data.Data)
          this.filesdata = response.data.Data
        }
      )
    }
  }
}
</script>
