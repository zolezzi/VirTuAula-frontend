const axios = require("axios");
const classroomService = (function() {
  function fetchClasses(token, accountId) {
      return axios.get(`/api/classrooms/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  }

  return {
      fetchClasses: fetchClasses
  };
})();

module.exports = classroomService;