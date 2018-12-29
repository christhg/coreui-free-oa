<template>
  <div>
    <select v-model="model">
      <option v-for="(item,index) in list" :key="index" :value="item.value">
        {{item.text}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      list: [],
      model: 0
    }
  },
  mounted () {
    for (let i = 0; i < 10000; i++) {
      this.list.push({
        value: i, text: 'select' + i
      })
    }
  }
}
</script>

<style>

</style>