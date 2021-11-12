const axios = require("axios");
const taskService = (function() {
  function fetchMissions(campaignId, token, accountId) {
      return axios.get(`/api/missions/players/${campaignId}/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }
  function fetchMissionsLeader(campaignId, accountId, token) {
    return axios.get(`/api/missions/${campaignId}/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
}

  return {
    fetchMissions: fetchMissions,
    fetchMissionsLeader: fetchMissionsLeader
  };
})();

module.exports = taskService;