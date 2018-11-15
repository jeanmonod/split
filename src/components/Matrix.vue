<template>
    <div>
        <h2>Expenses matrix</h2>
        <table>
            <tr>
                <th>Participant</th>
                <th v-for="g in groups">
                    {{ g.name }}
                    <button @click="removeGroup(g.id)">X</button>
                </th>
                <th>Total paid</th>
                <th>Personal part</th>
                <th>Balance</th>
            </tr>
            <tr v-for="p in participants">
                <td>{{ p.name }}
                    <button @click="removeParticipant(p.id)">X</button>
                </td>
                <td v-for="g in groups">
                    {{ expensesSum(p.id, g.id) | CHF }}
                </td>
                <td>{{ expensesSum(p.id, null) | CHF }}</td>
                <td>{{ getParticipantPart(p.id) | CHF }}</td>
                <td>{{ getParticipantBalance(p.id) | CHF }}
                </td>
            </tr>
            <tr>
                <th>Total per group</th>
                <th v-for="g in groups">{{ expensesSum(null, g.id) | CHF }}</th>
                <th>{{ expensesGrandTotal | CHF }}</th>
                <th>{{ sumParts | CHF }}</th>
                <th>{{ sumBalances }} CHF <pre>TODO fix this! should be at 0</pre></th>
            </tr>
        </table>
        <label for="newParticipantInput">New participant:</label>
        <input id="newParticipantInput" @keyup.enter="addParticipant()" v-model="newParticipantName"
               placeholder="name + ENTER">
        <br/>
        <label for="newGroupInput">New group:</label>
        <input id="newGroupInput" @keyup.enter="addGroup()" v-model="newGroupName" placeholder="name + ENTER">
    </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    data: function () {
      return {
        newParticipantName: '',
        newGroupName: ''
      }
    },
    computed: {
      ...mapGetters({
        expensesSum: 'expensesSum',
        getParticipantPart: 'getParticipantPart',
        getParticipantBalance: 'getParticipantBalance',
        expensesGrandTotal: 'expensesGrandTotal',
        sumParts: 'sumParts',
        sumBalances: 'sumBalances'
      }),
      ...mapState(['groups', 'participants']),
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
    },
  }
</script>

<style scoped>
    td, th {
        border: 1px solid lightgrey;
    }
</style>
