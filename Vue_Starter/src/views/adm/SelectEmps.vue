<template>
  <el-select v-model="value8" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { Select,Option } from 'element-ui'
import { getOrgsEmps } from '@/api/Orgs/getOrgsEmps.js'
export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: ''
      }
    },
    components:{
        'el-select': Select,
        'el-option': Option
    },
    created(){
        this.fetchEmps()
    },
    methods:{
        fetchEmps(){
            getOrgsEmps(this.$store.getters.pub_company_id).then( response => {
                this.options = response.data.Data
            })
            .catch(error =>{
                 MessageBox.alert(error)
            })
        }
    }
  }
</script>