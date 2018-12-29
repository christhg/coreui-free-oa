<template>
<div>
    <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
</div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    props:['loading'],
    data(){
        return {

        }
    },
    components:{
        PulseLoader
    }
}
</script>