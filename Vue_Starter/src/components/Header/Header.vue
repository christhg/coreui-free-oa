<template>
<div>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- logo圖標 -->
    <b-link class="navbar-brand" to="/SystemApps"></b-link>
    <!-- hamberger圖標 -->
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-4" to="/Demo/table1"><i class="icon-list"></i> 任務</b-nav-item>
      <b-nav-item class="px-4" to="/OA/Mywaiting"><i class="icon-note"></i> 審批</b-nav-item>
      <b-nav-item class="px-4" to="/Demo/Scroll"><i class="icon-bag"></i> 項目</b-nav-item>
      <b-nav-item class="px-4" to="/PublishBoard"><i class="icon-info"></i> 文檔</b-nav-item>
      <b-nav-item class="px-4" to="/SystemApps"><i class="icon-layers"></i> 其他應用</b-nav-item>
      <b-nav-item class="px-4" to="/PublishBoard"><i class="icon-info"></i> 公告</b-nav-item>      
      <!--<HeaderDropdownApp/>-->
      <HeaderToggle/>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">

      <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger"><span title="當前待審核文件筆數">{{waitingcount}}</span></b-badge>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
        <b-badge pill variant="danger"><span title="當前指派的工作數">0</span></b-badge>
      </b-nav-item>      
      <!--
      <b-nav-item class="d-md-down-none">
        <i class="icon-user"></i>
      </b-nav-item>
      -->
         
      <HeaderDropdown/>
    </b-navbar-nav>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
  <!--
  <div class="navbaraa" style="height:100px">
    <h2>title list</h2>
    <p/><h4>asfasdfasdfsdfsdfsdfsdfsdfsdf</h4>
    <p/>
  </div>
  -->
</div>  
</template>
<script>
import Header1 from './Header1'
import HeaderDropdown from './HeaderDropdown.vue'
import HeaderDropdownApp from './HeaderDropdownApp.vue'
import HeaderToggle from './HeaderToggle.vue'

export default {
  name: 'c-header',
  components: {
    HeaderDropdown,
    HeaderDropdownApp,
    HeaderToggle
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  },
  computed:{
    waitingcount:function(){
      return this.$store.getters.waitingcount
    }
  }
}
</script>
<style>
.navbar {
  font-family: Arial,"微軟正黑體","細明體";  
  font-size: 14px;
}
</style>
