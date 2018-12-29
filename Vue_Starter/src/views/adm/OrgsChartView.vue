<template>
<div>
<vo-basic :data="chartData" :pan="true" :zoom="true" :depth="1"></vo-basic>
</div>
</template>
<script>
import { VoBasic } from 'vue-orgchart'
import { getOrgsTree } from '@/api/Orgs/getOrgsTree.js'

export default {
  data(){
    return {
      chartData: {}
    }
  },
  components: { VoBasic },
  created () {
    this.fetchData()
    // this.chartData = {
    //     name: 'JavaScript',
    //     children: [
    //       { name: 'Angular' },
    //       {
    //         name: 'React',
    //         children: [{ name: 'Preact' }]
    //       },
    //       {
    //         name: 'Vue',
    //         children: [{ name: 'Moon' }]
    //       }
    //     ]
    // }
  },
  methods: {
    fetchData(){
        getOrgsTree(this.$store.getters.pub_company_id).then( response => {
            this.chartData = response.data.Data
        })
    }
  }
}
</script>