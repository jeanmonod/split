const getters = {
  getParticipant: (state) => (id) => state.participants[id],
  getGroup: (state) => (id) => state.groups[id],
  expensesSum: (state) => (participantId, groupId) => {
    return Object.values(state.expenses).reduce(function (sum, expense) {
      if ((groupId == null || expense.group == groupId) && (participantId == null || expense.participant == participantId)) {
        sum += expense.amount;
      }
      return sum;
    }, 0);
  },
  expensesGrandTotal: (state, getters) => getters.expensesSum(null, null),
  getParticipantPart: (state, getters) => (id) => getters.expensesGrandTotal / Object.keys(state.participants).length,
  sumParts: (state, getters) => Object.keys(state.participants).reduce((sum, pid) => sum + getters.getParticipantPart(pid), 0),
  getParticipantBalance: (state, getters) => (id) => getters.getParticipantPart(id) - getters.expensesSum(id, null),
  sumBalances: (state, getters) => Object.keys(state.participants).reduce((sum, pid) => sum + getters.getParticipantBalance(pid), 0),
  absoluteRefundBalances: (state) => Object.values(state.refunds.balances).reduce((sum, bal) => sum + Math.abs(bal), 0)
};

export default getters;