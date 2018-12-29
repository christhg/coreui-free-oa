<template>
<div class="mt-1">
    <b-form inline>          
        <!--表單篩選分組--> 
        <!--
        <b-form-select v-model="selected" :options="options" class="mb-2 mr-sm-2 mb-sm-0" />
        -->
        <!--開始日期分組 -->
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0 ">
            <b-form-input type="date" v-model="begin"/> 
            <b-input-group-append>
                <b-btn :disabled="true">起始</b-btn>
            </b-input-group-append>       
        </b-input-group> 
        
        <!--結束日期分組 -->      
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input type="date" v-model="end" /> 
                    <b-input-group-append>
            <b-btn :disabled="true">結束</b-btn>
            </b-input-group-append>       
        </b-input-group>     
      <b-button  variant="primary" @click="search" class="mb-2 mr-sm-2 mb-sm-0"><i class="icon-magnifier"></i>區間查詢</b-button>
      <!--過濾輸入分組 -->
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input v-model="filter" placeholder="過濾條件" />
        <b-input-group-append>
          <b-btn :disabled="true"><i class="icon-share"></i> 過濾</b-btn>
        </b-input-group-append> 
        <!--
        <b-input-group-append>
          <b-btn @click="filter = ''">Clear</b-btn>
        </b-input-group-append> -->                
        
      </b-input-group>
       
      <!-- Radio按鈕分組 -->
      <!--
        <b-form-group label="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-radio-group id="btnradios2"
                              buttons
                              button-variant="outline-primary"
                              size="md"
                              @input="fetchData()"
                              v-model="selected"
                              :options="options"
                              name="radioBtnOutline" />
        </b-form-group>
        -->    
    </b-form>
    <b-form inline>
        <small class="text-primary mb-2 mr-sm-2 mb-sm-0"><i class="icon-star"></i> 日期未選定默認為查詢90天內文件，查詢區間限制不可超過90天。</small>
    </b-form>          
</div>    
</template>
<script>
import * as moment from 'moment'
import { Message } from 'element-ui'

export default {
    data(){
        return {
            selected: null,
            options: [
                { value: null, text: '流程表單' },
                { value: '102', text: '加班單' },
                { value: '114', text: '請假單' }
            ],
            begin: null,
            end: null,
            filter: null
        }
    },
    watch:{
        filter (newValue,oldValue){
            this.$emit('filter', newValue)
        },
        begin (newValue,oldValue) {
            this.$emit('begin', newValue)
        },
        end (newValue,oldValue) {
            this.$emit('end', newValue)
        }
    },
    // computed: {
    //   filter: {
    //     get () {
    //         return this.value
    //     },
    //     set (value) {
    //         this.$emit('filter', value)
    //     }
    //   },
    //   begin: {
    //     get () {
    //         return this.value
    //     },
    //     set (value) {
    //         this.$emit('begin', value)
    //     }
    //   },
    //   end: {
    //     get () {
    //         return this.value
    //     },
    //     set (value) {
    //         this.$emit('end', value)
    //     }
    //   },
    // },
    methods: {
        search () {
            let o = {}
            o.filter = this.filter
            if(this.begin === null) {
                o.begin = -89
            }else {
                o.begin = moment(this.begin).diff(moment(),"days")
            }
            if(this.end === null) {
                o.end = 1
            }else {
                o.end = moment(this.end).diff(moment(),"days") + 1  // 當天也需要算在內
            }

            if(o.end - o.begin > 90){
                Message({
                    message: '查詢區間不可大於90天',
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            if(o.begin > 1 ){
                Message({
                    message: '起始查詢日期有誤',
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            this.$emit('onSearch',o)
            // alert(JSON.stringify(o))
        }
    }
}
</script>
