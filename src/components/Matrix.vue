<template>
    <div>
        <h2>Expenses matrix</h2>
        <table>
            <tr>
                <th>Participant</th>
                <template v-for="g in groups">
                    <th>
                        {{ g.name }}
                        <button @click="removeGroup(g.id)">X</button>
                        <button @click="togglePartialGroup(g.id)">%</button>
                    </th>
                    <th v-if="g.partial">{{ g.name }} %</th>
                </template>
                <th>Total paid</th>
                <th>Personal part</th>
                <th>Balance</th>
            </tr>
            <tr v-for="p in participants">
                <td>{{ p.name }}
                    <button @click="removeParticipant(p.id)">X</button>
                </td>
                <template v-for="g in groups">
                    <td>{{ expensesSum(p.id, g.id) | CHF }}</td>
                    <td v-if="g.partial">
                        <input v-if="g.partial" class="partial-input"
                            :placeholder="getParticipantPartPlaceholder(g.id, p.id)"
                            :value="getParticipantPartSetting(g.id, p.id)"
                            @keyup="updatePartSetting($event, g.id, p.id)"
                        >
                        <small>{{ getParticipantGroupAmount(p.id, g.id) | CHF }}</small>
                    </td>
                </template>
                <td>{{ expensesSum(p.id, null) | CHF }}</td>
                <td>{{ getParticipantTotalAmount(p.id) | CHF }}</td>
                <td>{{ getParticipantBalance(p.id) | CHF }}
                </td>
            </tr>
            <tr>
                <th>Total per group</th>
                <template v-for="g in groups">
                    <th>{{ expensesSum(null, g.id) | CHF }}</th>
                    <th v-if="g.partial"></th>
                </template>
                <th>{{ expensesTotal | CHF }}</th>
                <th>{{ getTotalAmount | CHF }}</th>
                <th>{{ sumBalances | CHF }} CHF</th>
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
        newGroupName: '',
        partSettings: []
      }
    },
    computed: {
      ...mapGetters({
        expensesSum: 'expensesSum',
        getParticipantGroupAmount: 'getParticipantGroupAmount',
        getParticipantTotalAmount: 'getParticipantTotalAmount',
        getParticipantPartSetting: 'getParticipantPartSetting',
        getParticipantBalance: 'getParticipantBalance',
        expensesTotal: 'expensesTotal',
        getTotalAmount: 'getTotalAmount',
        sumBalances: 'sumBalances',
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
      togglePartialGroup(id) {
        this.$store.dispatch('togglePartialGroup', id);
      },
      updatePartSetting(event, gId, pId) {
        let val = event.target.value;
        this.$store.dispatch('updatePartSetting', {gId, pId, val});
      },
      getParticipantPartPlaceholder(gId) {
        return Object.keys(this.groups[gId].parts).length === 0 ? '% or unit' : 1
      }
    },
  }
</script>

<style scoped>
    td, th {
        border: 1px solid lightgrey;
    }
    .partial-input {
        width: 70px;
    }
</style>
