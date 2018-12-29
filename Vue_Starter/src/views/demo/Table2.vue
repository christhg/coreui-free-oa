<template>
  <my-steps></my-steps>
</template>

<script>
import MySteps from '@/views/OA/MySteps'
export default {
  data () {
    return {
      items: []
    }
  },
  components:{
    'my-steps': MySteps
  }
}
</script>