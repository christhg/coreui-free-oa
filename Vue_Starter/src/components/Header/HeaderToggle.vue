<template>
<div>
    <!--
    <b-btn 
        @click="showCollapse = !showCollapse"
        :class="showCollapse ? 'collapsed primary' : null"
        area-controls="collapse3"
        :area-expanded="showCollapse ? 'true' : 'false'">
     其他應用
     </b-btn>-->
    <b-nav-item class="px-4"
        @click="showCollapse = !showCollapse"
        :class="showCollapse ? 'collapsed primary' : null"
        area-controls="collapse3"
        :area-expanded="showCollapse ? 'true' : 'false'"> 
    <i class="icon-layers"></i> 其他應用</b-nav-item>     
    <b-collapse id="collapse3" v-model="showCollapse">
            <b-card>
                I should start open!I should start open!I should start open!
                <b-list-group>
                    <b-list-group-item button @click="GetApps('OA')"><i class="fa fa-bluetooth fa-lg"></i> Button item</b-list-group-item>
                    <b-list-group-item button @click="GetApps('HR')"><i class="fa fa-product-hunt fa-lg"></i> I am a button</b-list-group-item>
                    <b-list-group-item button disabled><i class="fa fa-modx fa-lg"></i> Disabled button</b-list-group-item>
                    <b-list-group-item button @click="GetApps(row.APP_CODE)" v-for="(row,index) in rows" :key="index">
                        <i class="text-success fa fa-edge fa-lg"></i> 
                        <span class="text-primary"> {{row.APP_NAME}}</span>
                        <small class="text-muted">{{ row.DESCRIPTION }}</small>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
    </b-collapse>
</div>
</template>
<script>
export default {
    name: 'header-toggle',
    data(){
        return {
            showCollapse: false,
            rows: this.$store.getters.applists
        }
    },
    methods:{
        GetApps:function(code){
            //01.更新系統菜單
            this.$store.dispatch('GetAppMenus', {
                user_id: this.$store.getters.uid,
                app_code: code,
                pub_company_id: this.$store.getters.pub_company_id
            })
            //02.路由到相應頁面
            this.$router.push({path:code})
            this.showCollapse = !this.showCollapse
        }
    }
}
</script>
<style scoped>
    #collapse3{
        position:absolute;
        margin-top: 2px;
        width:600px;

    }
</style>