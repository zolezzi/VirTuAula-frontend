const axios = require("axios");
const classroomService = (function() {
  function fetchClasses(token, accountId) {
    return axios.get(`/api/new-games/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function createClassroom(token, accountId, formData) {
    return axios.post(`/api/new-games/create/${accountId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    fetchClasses: fetchClasses,
    createClassroom: createClassroom,
  };
})();

module.exports = classroomService;
