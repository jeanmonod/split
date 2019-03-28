const getters = {

  getParticipant: (state) => (id) => state.participants[id],
  getGroup: (state) => (id) => state.groups[id],

  // Sum expenses, allow to group by participant or by group
  expensesSum: (state) => (pId, gId) => {
    return Object.values(state.expenses).reduce(function (sum, expense) {
      if ((gId == null || expense.group == gId) && (pId == null || expense.participant == pId)) {
        sum += expense.amount;
      }
      return sum;
    }, 0);
  },
  expensesTotal: (state, getters) => getters.expensesSum(null, null),

  // Return the number of part a participant will pay for a given group. By default 1
  getParticipantGroupPart: (state) => (pId, gId) => {
    return pId in state.groups[gId].parts ? parseInt(state.groups[gId].parts[pId]) : 1;
  },
  // Return the custom number of part if a custom value have been set
  getParticipantPartSetting: (state) => (gId, pId) => state.groups[gId].parts[pId],
  // Return the % a participant have to pay for a given group
  getParticipantGroupPercentage: (state, getters) => (pId, gId) => {
    const totalParts = Object.keys(state.participants).reduce((acc, pId) =>
      acc + getters.getParticipantGroupPart(pId, gId)
    , 0.0);
    return getters.getParticipantGroupPart(pId, gId) / totalParts;
  },
  // Return the amount a participant have to pay for a given group
  getParticipantGroupAmount: (state, getters) => (pId, gId) => {
    return getters.expensesSum(null, gId) * getters.getParticipantGroupPercentage(pId, gId);
  },
  // Sum all group amounts for a given participant
  getParticipantTotalAmount: (state, getters) => (pId) => {
    return Object.keys(state.groups).reduce((acc, gId) =>
      acc + getters.getParticipantGroupAmount(pId, gId)
    , 0.0);
  },
  // Sum all participants amounts, this all to double check the split
  getTotalAmount: (state, getters) => Object.keys(state.participants).reduce((sum, pid) =>
    sum + getters.getParticipantTotalAmount(pid)
  , 0),


  getParticipantBalance: (state, getters) => (id) => {
    return getters.getParticipantTotalAmount(id) - getters.expensesSum(id, null);
  },
  sumBalances: (state, getters) => Object.keys(state.participants).reduce((sum, pid) =>
    sum + getters.getParticipantBalance(pid)
  , 0),
  absoluteRefundBalances: (state) => Object.values(state.refunds.balances).reduce((sum, bal) => sum + Math.abs(bal), 0),

};

export default getters;
