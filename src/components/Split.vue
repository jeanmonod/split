<template>
  <div class="split">
    <h1>Split</h1>
    <table>
      <tr>
        <th>Participant</th>
        <th v-for="g in $store.state.groups">
          {{ g.name }} <button @click="removeGroup(g.id)">X</button>
        </th>
      </tr>
      <tr v-for="p in $store.state.participants">
        <td>{{ p.name }} <button @click="removeParticipant(p.id)">X</button></td>
        <th v-for="g in $store.state.groups">
          <input class="amount" />
        </th>
      </tr>
    </table>
    <label for="newParticipantInput">New participant:</label>
    <input id="newParticipantInput" @keyup.enter="addParticipant()" v-model="newParticipantName" placeholder="name + ENTER">
    <br />
    <label for="newGroupInput">New group:</label>
    <input id="newGroupInput" @keyup.enter="addGroup()" v-model="newGroupName" placeholder="name + ENTER">
  </div>
</template>

<script>
export default {
  name: 'Split',
  data: function () {
    return {
      newParticipantName: '',
      newGroupName: ''
    }
  },
  props: {
  },
  methods: {
    addParticipant() {
      if (this.newParticipantName.length > 0) {
        this.$store.dispatch('addParticipant', this.newParticipantName);
      }
      this.newParticipantName = '';
    },
    removeParticipant(position) {
        this.$store.dispatch('removeParticipant', position);
    },
    addGroup() {
      if (this.newGroupName.length > 0) {
        this.$store.dispatch('addGroup', this.newGroupName);
      }
      this.newGroupName = '';
    },
    removeGroup(position) {
      this.$store.dispatch('removeGroup', position);
    },
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
td, th {
  border: 1px solid lightgrey;
}
input.amount {
  width: 30px;
}

</style>
