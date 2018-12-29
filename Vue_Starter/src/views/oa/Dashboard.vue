<template>
<b-container fluid>
  <b-row>
      <b-col sm="6" lg="3">
        <b-card>
          <div class="h4 m-0">{{overtime}}</div>
          <div>當月已加班時數</div>
          <b-progress height={} class="progress-xs my-3" variant="primary" :value="overtime/target[0]*100"/>
          <small class="text-primary">當月每人加班時數限制在{{target[0]}}小時，當前已加班比例為{{overtime/target[0]*100}}%.</small>
        </b-card>
      </b-col> 
      <b-col sm="6" lg="3">
        <b-card>
          <div class="h4 m-0">{{leave}}</div>
          <div>年度已請假天數</div>        
          <b-progress height={} class="progress-xs my-3" variant="success" :value="leave/target[1]*100"/>
          <small class="text-success">年度年假天數為7天，事假天數為{{target[1]}}天，當前已請假天數比例為{{leave/target[1]*100}}%.</small>
        </b-card>
      </b-col>  
      <b-col sm="6" lg="3">
        <b-card>
          <div class="h4 m-0">3</div>
          <div>當前已完成任務數</div>
          <b-progress height={} class="progress-xs my-3" variant="warning" :value="task/target[3]*100"/>
          <small class="text-warning">本月任務數為{{target[2]}}，當前已完成工作任務數比例為{{task/target[3]*100}}%.</small>
        </b-card>
      </b-col>  
      <b-col sm="6" lg="3">
        <b-card>
          <div class="h4 m-0">{{waitingcount}}</div>
          <div>當前待簽核筆數</div>
          <b-progress height={} class="progress-xs my-3" variant="danger" :value="waitingcount"/>
          <small class="text-muted">當前所有系統各表單待簽核的筆數，簽核狀態，Lorem ipsum dolor sit amet enim.</small>
        </b-card>
      </b-col> 
  </b-row>    
  <hr>  
  <b-row v-show="false">                      
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-cogs bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-laptop bg-info p-4 px-5 font-2xl mr-3 float-left"></i>
            <div class="h5 text-info mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-moon-o bg-warning p-4 px-5 font-2xl mr-3 float-left"></i>
            <div class="h5 text-warning mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6" lg="3">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-bell bg-danger p-4 px-5 font-2xl mr-3 float-left"></i>
            <div class="h5 text-danger mb-0 pt-3">$1.999,50</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
          </b-card-body>
        </b-card>
      </b-col>
  </b-row>
   <b-row v-show="false">
      <b-col sm="6" md="2">
        <b-card class="text-white bg-info">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-people"></i>
          </div>
          <div class="h4 mb-0">87.500</div>
          <small class="text-muted text-uppercase font-weight-bold">Visitors</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
      <b-col sm="6" md="2">
        <b-card class="text-white bg-success">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-user-follow"></i>
          </div>
          <div class="h4 mb-0">385</div>
          <small class="text-muted text-uppercase font-weight-bold">New Clients</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
      <b-col sm="6" md="2">
        <b-card class="text-white bg-warning">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-basket-loaded"></i>
          </div>
          <div class="h4 mb-0">1238</div>
          <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
      <b-col sm="6" md="2">
        <b-card class="text-white bg-primary">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-pie-chart"></i>
          </div>
          <div class="h4 mb-0">28%</div>
          <small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
      <b-col sm="6" md="2">
        <b-card class="text-white bg-danger">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-speedometer"></i>
          </div>
          <div class="h4 mb-0">5:34:11</div>
          <small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
      <b-col sm="6" md="2">
        <b-card class="text-white bg-info">
          <div class="h1 text-muted text-right mb-4">
            <i class="icon-speech"></i>
          </div>
          <div class="h4 mb-0">972</div>
          <small class="text-muted text-uppercase font-weight-bold">Comments</small>
          <b-progress height={} class="progress-white progress-xs mt-3" :value="25"/>
        </b-card>
      </b-col>
  </b-row>
</b-container>  
</template>

<script>
export default {
  name: 'dashboard',
  data(){
    return {
      overtime:20,
      leave:5,
      task:13,
      sign:0,
      target:[50,30,50,30] //限制總數
    }
  },
  mounted: function() {
    var payload = {
      userId: this.$store.getters.uid,
      pubCompanyId: this.$store.getters.pub_company_id
    }
    this.$store.dispatch('GetWaitingCount',payload)
  },
  computed:{
    waitingcount:function(){
      return this.$store.getters.waitingcount
    }
  }
}
</script>
