const axios = require("axios");
const classroomService = (function() {
  function fetchClasses(token, accountId) {
    return axios.get(`/api/classrooms/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function createClassroom(token, accountId, classroom) {
    return axios.post(`/api/classrooms/create/${accountId}`, classroom, {
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
