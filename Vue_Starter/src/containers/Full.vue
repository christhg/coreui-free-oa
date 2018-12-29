<template>
  <div class="app">
    <AppHeader />
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <!-- <breadcrumb :list="list"/> --> <!--漢堡排列-->
        <!--<Mytabs :list="list"/>--> <!--標籤排列-->

        <!-- <div class="container-fluid"> -->
        <div>
          <b-card>
            <div slot="header">
              <label class="float-left mb-0" onclick='window.history.go(-1)'><i class='fa fa-angle-left fa-lg'></i> {{routeTitle}}</label>            
              <label class="switch switch-sm switch-text switch-info float-right mb-0">
                <input type="checkbox" class="switch-input">
                <span class="switch-label" data-on="On" data-off="Off"></span>
                <span class="switch-handle"></span>
              </label>
              <label class="float-right mb-0" @click="getPdf()"><i class="text-danger fa fa-file-pdf-o fa-lg mr-4"></i></label>
            </div>
              <router-view></router-view>    
          </b-card> 
        </div>

      </main>
      <AppAside/>
    </div>
  </div>
</template>

<script>
// import nav from '../_nav'   // 靜態菜單列表
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'
import  Tabs  from '@/components/Tabs'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb,
    'Mytabs': Tabs
  },
  data () {
    return {
      // nav: nav.items
      htmlTitle:'MyPDF'
    }
  },
  methods: {
    return(){
      this.router.go(-1)
    }
  },
  computed: {
    nav () {
      return this.$store.getters.navitems // 動態菜單列表
      // return nav.items
    },
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    },
    routeTitle () {
      let last = this.$route.matched.length - 1
      return this.$route.matched[last].name
    }
  }
}
</script>
<style scoped>
.app {
    font-family: Arial,"微軟正黑體","細明體";
}
.fa:hover {
  cursor:pointer;
}
.float-left:hover {
  cursor:pointer;
}
</style>
