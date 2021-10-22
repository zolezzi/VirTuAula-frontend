const axios = require("axios");

const accountService = (function() {
  function getExperience(token, accountId) {
    return axios.get(`/api/account/experience/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    getExperience: getExperience,
  };
})();

module.exports = accountService;
