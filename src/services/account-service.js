const axios = require("axios");

const accountService = (function() {
  function getExperience(token, accountId) {
    return axios.get(`/api/account/experience/${accountId}`, {
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

  function createAccount(token, accountId, account) {
    return axios.post(`/api/account/create/${accountId}`, account, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function addStudents(token, accountId, file) {
    return axios.post(`/api/account/upload-file-students/${accountId}`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getStudents(token, accountId) {
    return axios.get(`/api/account/students/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    getExperience: getExperience,
    createAccount: createAccount,
    addStudents: addStudents,
    getStudents: getStudents,
    getLevel: getLevel
  };
})();

module.exports = accountService;
