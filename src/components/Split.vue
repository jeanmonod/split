<template>
  <div class="split">
    <h1>Split</h1>

    <h2>Expenses matrix</h2>
    <table>
      <tr>
        <th>Participant</th>
        <th v-for="g in $store.state.groups">
          {{ g.name }} <button @click="removeGroup(g.id)">X</button>
        </th>
        <th>Total paid</th>
        <th>Personal part</th>
        <th>Balance</th>
      </tr>
      <tr v-for="p in $store.state.participants">
        <td>{{ p.name }} <button @click="removeParticipant(p.id)">X</button></td>
        <td v-for="g in $store.state.groups">
          {{ expensesSum(p.id, g.id) }} CHF
        </td>
        <td>{{ expensesSum(p.id, null) }} CHF</td>
        <td>{{ expensesSum(null, null) / Object.keys($store.state.participants).length }} CHF</td>
        <td>{{ (expensesSum(null, null) / Object.keys($store.state.participants).length) - expensesSum(p.id, null) }} CHF</td>
      </tr>
      <tr>
        <th>Total per group</th>
        <th v-for="g in $store.state.groups">{{ expensesSum(null, g.id) }} CHF</th>
        <th>{{ expensesSum(null, null) }} CHF</th>
      </tr>
    </table>
    <label for="newParticipantInput">New participant:</label>
    <input id="newParticipantInput" @keyup.enter="addParticipant()" v-model="newParticipantName" placeholder="name + ENTER">
    <br />
    <label for="newGroupInput">New group:</label>
    <input id="newGroupInput" @keyup.enter="addGroup()" v-model="newGroupName" placeholder="name + ENTER">

    <h2>Expenses list</h2>
    <div class="expenses">
      <ul>
        <li v-for="e in $store.state.expenses">
          {{ getParticipant(e.participant).name }} for {{ getGroup(e.group).name }} {{ e.name }}: {{ e.amount }} CHF
          <button @click="removeExpense(e.id)">X</button>
        </li>
      </ul>
      <form @submit.prevent="createNewExpense()">
        <label for="newGroupInput">New expense:</label>
        <input v-model.number="newExpenseForm.amount" type="number" style="width:40px;" required>CHF
        <select v-model="newExpenseForm.participant" required>
          <option v-for="p in $store.state.participants" :value="p.id">{{ p.name }}</option>
        </select>
        <select v-model="newExpenseForm.group" required>
          <option v-for="g in $store.state.groups" :value="g.id">{{ g.name }}</option>
        </select>
        <input v-model="newExpenseForm.name" placeholder="optional">
        <button>Insert</button>
      </form>
    </div>

    <h2>Refunds</h2>
    TO BE IMPLEMENTED

  </div>
</template>

<script>
export default {
  name: 'Split',
  data: function () {
    return {
      newParticipantName: '',
      newGroupName: '',
      newExpenseForm: {
          name: '',
          amount: '',
          participant: 1,
          group: 1
      }
    }
  },
  props: {
  },
  methods: {
    getParticipant(id) {
      return this.$store.state.participants[id];
    },
    getGroup(id) {
      return this.$store.state.groups[id];
    },
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
    createNewExpense() {
      this.$store.dispatch('addExpense', this.newExpenseForm);
    },
    removeExpense(id) {
      this.$store.dispatch('removeExpense', id);
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
