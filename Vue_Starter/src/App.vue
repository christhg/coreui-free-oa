
<template>
<div id="app">
  <router-view></router-view>
  <my-loading :showLoading="loading"></my-loading>
</div>
</template>

<script>
/* eslint-disable */
//import { mapState } from 'vuex'
import MyLoading from '@/views/components/MyLoading'

export default {
  name: 'app',
  computed: {
      //...mapState(['loading'])
      loading(){
        return this.$store.getters.loading
      }
  },
  components:{
     'my-loading': MyLoading
  }
}
</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
</style>
<style>
  /* Import Bootstrap Vue Styles */
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
</style>
<style lang="scss">
  /* Import Main styles for this application */
  @import './assets/scss/style';
</style>
<style lang="css">
#app {
  font-family: Arial,"微軟正黑體","細明體";
  font-size: 14px;
}
</style>
