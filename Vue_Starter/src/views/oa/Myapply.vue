<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" md="4">
        <b-card header="人事表單(HR)" class="card-accent-primary">        
          <b-button size="lg" variant="outline-primary" :block="true" @click="overtime">加班單</b-button>
          <b-button size="lg" variant="outline-primary" :block="true" @click="leave">請假單</b-button>
          <b-button size="lg" variant="outline-primary" :block="true" @click="showAlert">派車單</b-button>
          <b-button size="lg" variant="outline-secondary" :block="true" :disabled="true" @click="showAlert">未刷卡申請單</b-button>
        </b-card>
      </b-col>
      <b-col sm="6" md="4">
        <b-card header="網域郵件表單(APPLY)" class="card-accent-success">  
          <b-button size="lg" variant="outline-success" :block="true" @click="showAlert">網域郵件申請單</b-button>      
          <b-button size="lg" variant="outline-success" :block="true" :disabled="true" @click="showAlert">其他申請單</b-button>                  
        </b-card>
      </b-col>
      <b-col sm="6" md="4">
        <b-card header="<i class='fa fa-check'></i> 工程類表單" class="card-accent-info">
          <b-button size="lg" variant="outline-info" :block="true" @click="showAlert">ECN申請單</b-button> 
          <b-button size="lg" variant="outline-info" :block="true" @click="demo">承認書申請單</b-button>         
          <b-button size="lg" variant="outline-info" :block="true" @click="demo">客訴申請單</b-button>         
        </b-card>
      </b-col>      
      <b-col sm="6" md="4">
        <b-card header="<i class='fa fa-check'></i> 其他表單" class="card-accent-warning"> 
                  <b-button size="lg" variant="danger" :block="true" @click="showAlert">空白申請單</b-button>    
          <b-button size="lg" variant="outline-warning" :block="true" @click="demo">其他申請單</b-button>         
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'cards',
  data () {
    return {
    }
  },
  methods:{
      showAlert () {
       Message.error("努力建立中.....")
     },
      overtime: function(){
          this.$router.push('/HR/Overtime')
      },
      leave: function(){
          this.$router.push('/HR/Leave')
      },
      demo: function(){
        this.$router.push('/mytrees')
      }
  }
}
</script>
