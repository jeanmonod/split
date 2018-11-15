<template>
    <div>
        <h2>Expenses list</h2>
        <div class="expenses">
            <ul>
                <li v-for="e in expenses">
                    {{ getParticipant(e.participant).name }} for {{ getGroup(e.group).name }} "{{ e.name}}": {{ e.amount | CHF}}
                    <button @click="removeExpense(e.id)">X</button>
                </li>
            </ul>
            <form @submit.prevent="createNewExpense()">
                <label for="newGroupInput">New expense:</label>
                <input id="newGroupInput" v-model.number="newExpenseForm.amount" type="number" step="0.01" style="width: 40px;" required>CHF
                <select v-model="newExpenseForm.participant" required>
                    <option v-for="p in participants" :value="p.id">{{ p.name }}</option>
                </select>
                <select v-model="newExpenseForm.group" required>
                    <option v-for="g in groups" :value="g.id">{{ g.name }}</option>
                </select>
                <input v-model="newExpenseForm.name" placeholder="optional">
                <button>Insert</button>
            </form>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    data: function () {
      return {
        newExpenseForm: {
          name: '',
          amount: '',
          participant: 1,
          group: 1
        }
      }
    },
    computed: {
      ...mapGetters({
        getGroup: 'getGroup',
        getParticipant: 'getParticipant'
      }),
      ...mapState(['groups', 'participants', 'expenses']),
    },
    methods: {
      createNewExpense() {
        this.$store.dispatch('addExpense', this.newExpenseForm);
      },
      removeExpense(id) {
        this.$store.dispatch('removeExpense', id);
      },
    },
  }
</script>