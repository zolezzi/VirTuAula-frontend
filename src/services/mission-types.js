const axios = require("axios");
const missionTypeService = (function() {
  function fetchMissionsTypes(token) {
      return axios.get(`/api/mission-types`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }

  return {
    fetchMissionsTypes: fetchMissionsTypes
  };
})();

module.exports = missionTypeService;