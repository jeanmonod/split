<template>
    <div>
        <h2>Refunds ({{absoluteRefundBalances}})</h2>
        <button v-if="refunds.resolver == null" @click="solveBalances()">Settle balances</button>
        <button v-if="refunds.resolver != null" @click="stopResolver()">Stop resolution</button>
        <h3>Needed transactions</h3>
        <ul>
            <li v-for="r in refunds.transactions">
                {{ r.id }}) From {{ getParticipant(r.from).name }} to {{ getParticipant(r.to).name }}: {{ r.amount | CHF}}
            </li>
        </ul>
        <h3>Final balances</h3>
        <ul>
            <li v-for="(balance, pid) in refunds.balances">
                {{ getParticipant(pid).name }}: {{ balance | CHF}}
            </li>
        </ul>
    </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    methods: {
      solveBalances() {
        this.$store.dispatch('startResolver');
      },
      stopResolver() {
        this.$store.dispatch('stopResolver');
      }
    },
    computed: {
      ...mapState(['refunds']),
      ...mapGetters({
        getParticipant: 'getParticipant',
        absoluteRefundBalances: 'absoluteRefundBalances'
      }),
    },
  }
</script>