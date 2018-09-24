<template>
  <div class="split">
    <h1>Split</h1>
    <ul>
      <li v-for="p in this.$store.state.participants">{{ p }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Split',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
