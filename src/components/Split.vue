<template>
  <div class="split">
    <h1>Split</h1>
    <ul>
      <li v-for="(p, index) in this.$store.state.participants">
        {{ p }} <button @click="removeParticipant(index)">X</button>
      </li>
    </ul>
    <label for="newParticipantInput">New participant:</label>
    <input id="newParticipantInput" @keyup.enter="addParticipant()" v-model="newName" placeholder="name + ENTER">
  </div>
</template>

<script>
export default {
  name: 'Split',
  data: function () {
    return {
      newName: ''
    }
  },
  props: {
  },
  methods: {
    removeParticipant(position) {
      this.$store.dispatch('removeParticipant', position);
    },
    addParticipant() {
      if (this.newName.length > 0) {
        this.$store.dispatch('addParticipant', this.newName);
      }
      this.newName = '';
    }
  },
}
</script>

<style scoped>
h1 {
  color: red;
}

</style>
