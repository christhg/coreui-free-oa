<template>
<div>
  <!-- 
  <b-list-group>
   <b-list-group-item button @click="fetchData(0)">
       <span>{{title}}</span>
   </b-list-group-item>   
  </b-list-group>
  -->
  <ol class="breadcrumb">
    <li class="breadcrumb-item" :key="index" v-for="(item, index) in list">
      <span class="active" v-if="isLast(index)">{{ item.CATEGORY_NAME }}</span>
      <router-link :to="'DccCurent?no='+item.CATEGORY_NO" v-else>{{ item.CATEGORY_NAME }}</router-link>
    </li>
  </ol>  

  <b-list-group>
    <b-list-group-item button @click="entryFolder(data.CATEGORY_NO,data.CATEGORY_NAME)" v-for="(data,index) in datas" :key="index" class="d-flex justify-content-between align-items-center">
      <i class="icon-folder primary"> {{data.CATEGORY_NAME}}</i>
      <b-badge variant="primary" pill>14</b-badge>
    </b-list-group-item>
  </b-list-group>
</div>  
</template>
<script>
import { getCategories } from '@/api/DCC/getCategories.js'
export default {
  data() {
    return {
      props:['no'],
      list: [
        {
          'CATEGORY_NO':'0',
          'CATEGORY_NAME':'所有文件'
        },
        {
          'CATEGORY_NO':'0',
          'CATEGORY_NAME':'一階文件'
        }
      ],
      datas: [
        {
          'CATEGORY_NO': '1',
          'CATEGORY_NAME': 'AA'
        },
        {
          'CATEGORY_NO': '2',
          'CATEGORY_NAME': 'BB'
        }
        ]
    }
  },
  created(){
    this.fetchData(0)
  },
  methods: {
    fetchData(categoryNo) {
      getCategories(categoryNo).then(
        response => {
          this.datas = response.data.Data
        }
      )
    },
    isLast (index) {
      return index === this.list.length - 1
    },
    entryFolder(categoryNo,categoryName){
      this.fetchData(categoryNo)
      let o = {}
      o.CATEGORY_NO = categoryNo
      o.CATEGORY_NAME = categoryName
      this.list.push(o)
    }
  }
}
</script>