<template>
  <div id="appload">
        <vue-data-loading :loading="loading" :completed="completed" :listens="['infinite-scroll', 'pull-down']" :init-scroll="true" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
            <div slot="pull-down-ready">ready to refresh</div>
            <b-card v-show="true" v-for="(item,index) in list" :key="index"
                bg-variant="white" 
                text-variant="dark" 
                :title="item.EMP_NAME" 
                :sub-title="item.EMP_NO"                 
                :footer="'(' + index + ') ' + item.CREATED_AT+' UID帳號:'+item.LDAP_UID"
                footer-tag="footer">
            </b-card>           
            <div slot="infinite-scroll-loading">loading...</div>
            <div slot="completed">-已加載所有資料-<hr><p></p></div>
        </vue-data-loading>
  </div>
</template>
<script>
import VueDataLoading from 'vue-data-loading'
import { getPagesEmps } from '@/api/Orgs/getPagesEmps'

export default {
  data(){
    return {
                list: [],
                loading: false,
                completed: false,
                page: 1,
    }
  },
  components:{
    VueDataLoading
  },
  methods: {
            fetchData() {
                this.loading = true
                setTimeout(() => {
                    if (this.page > 5) {
                        this.completed = true
                        this.loading = false
                        return
                    }
                    var temp = []
                    getPagesEmps (200, this.page,10).then(response =>{
                        temp = response.data.Data.tableData
                        this.list = this.list.concat(temp)
                        this.loading = false
                    })

                }, 1000)
            },
            pullUp() {
                this.fetchData()
                this.page++
            },
            pullDown() {
                this.list = []
                this.page = 1
                this.completed = false
                this.fetchData()
            },
            infiniteScroll() {
                this.fetchData()
                this.page++
            },
  },
  created() {
    // this.fetchData()
  }
}
</script>
<style lang="scss">
    .appload {
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
    }
</style>