<template>
  <div>
    <h2>Expenses matrix</h2>
    <table>
      <tr>
        <th>Participant</th>
        <th v-for="g in getGroups">
          {{ g.name }} <button @click="removeGroup(g.id)">X</button>
        </th>
        <th>Total paid</th>
        <th>Personal part</th>
        <th>Balance</th>
      </tr>
      <tr v-for="p in getParticipants">
        <td>{{ p.name }} <button @click="removeParticipant(p.id)">X</button></td>
        <td v-for="g in getGroups">
          {{ expensesSum(p.id, g.id) | CHF }}
        </td>
        <td>{{ expensesSum(p.id, null) | CHF }}</td>
        <td>{{ expensesSum(null, null) / Object.keys(getParticipants).length | CHF }}</td>
        <td>{{ (expensesSum(null, null) / Object.keys(getParticipants).length) - expensesSum(p.id, null) | CHF }}</td>
      </tr>
      <tr>
        <th>Total per group</th>
        <th v-for="g in getGroups">{{ expensesSum(null, g.id) | CHF }} CHF</th>
        <th>{{ expensesSum(null, null) | CHF }}</th>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Split',
  data: function () {
    return {
      newParticipantName: '',
      newGroupName: ''
    }
  },
  computed: {
    ...mapGetters(['getGroups', 'getGroup', 'getParticipants', 'getParticipant'])
  },
  methods: {
    addParticipant() {
      if (this.newParticipantName.length > 0) {
        this.$store.dispatch('addParticipant', this.newParticipantName);
      }
      this.newParticipantName = '';
    },
    removeParticipant(id) {
        this.$store.dispatch('removeParticipant', id);
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
    expensesSum(participantId, groupId) {
      return Object.values(this.$store.state.expenses).reduce(function (sum, expense) {
        if ((groupId== null || expense.group == groupId) && (participantId==null || expense.participant == participantId)) {
          sum += expense.amount;
        }
        return sum;
      }, 0);
    },
  },
}
</script>

<style scoped>
  td, th {
    border: 1px solid lightgrey;
  }
</style>
