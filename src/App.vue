<template>
  <div id="app">
    <h1>Split</h1>
    <Matrix />
    <Expenses />
    <Refunds />
  </div>
</template>

<script>
import Matrix from './components/Matrix.vue'
import Expenses from './components/Expenses.vue'
import Refunds from './components/Refunds.vue'

export default {
  name: 'app',
  components: {
    Matrix, Expenses, Refunds
  }
}
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
