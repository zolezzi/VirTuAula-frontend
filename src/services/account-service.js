const axios = require("axios");

const accountService = (function() {
  function getExperience(token, accountId) {
    return axios.get(`/api/account/experience/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function createAccount(token, accountId, account) {
    return axios.post(`/api/account/create/${accountId}`, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    getExperience: getExperience,
    createAccount: createAccount
  };
})();

module.exports = accountService;
