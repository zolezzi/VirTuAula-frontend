const axios = require("axios");

const accountService = (function() {
  function createAccount(token, accountId, account) {
    return axios.post(`/api/account/create/${accountId}`, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getExperience(token, accountId) {
    return axios.get(`/api/account/experience/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function addPlayers(token, accountId, file) {
    return axios.post(`/api/account/upload-file-players/${accountId}`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getLevel(token, accountId) {
    return axios.get(`/api/account/level/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getBuffers(token, accountId) {
    return axios.get(`/api/account/buffers/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  function getGoals(token, accountId) {
    return axios.get(`/api/account/goals/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getLifes(token, accountId) {
    return axios.get(`/api/account/life/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getPlayers(token, accountId) {
    return axios.get(`/api/account/players/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    getExperience: getExperience,
    createAccount: createAccount,
    addPlayers: addPlayers,
    getPlayers: getPlayers,
    getLevel: getLevel,
    getBuffers: getBuffers,
    getGoals: getGoals,
    getLifes: getLifes
  };
})();

module.exports = accountService;
