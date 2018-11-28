<template>
    <div>
        <button @click="persistData()">Save</button>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    methods: {
      persistData() {
        this.$store.dispatch('persistData');
        window.location = '?data=' + this.queryString;
      },
    },
    computed: {
      ...mapState(['queryString']),
    },
  }
</script>