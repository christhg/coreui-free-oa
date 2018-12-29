<template>
<b-card no-body>
  <b-tabs pills card>
    <b-tab no-body :title="showName(item)" :key="index" v-for="(item, index) in list" v-if="index === (list.length -1)">
         <router-view></router-view>
    </b-tab>
  </b-tabs>
</b-card>
</template>
<script>
export default {
  name:'Tabs',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data(){
      return {
      }
  },
  created(){

  },
  methods:{
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>