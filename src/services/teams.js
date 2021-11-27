const axios = require("axios");
const teamsService = (function() {
  function fetchTeams(token, accountId) {
      return axios.get(`/api/teams/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }

  return {
    fetchTeams: fetchTeams
  };
})();

module.exports = teamsService;