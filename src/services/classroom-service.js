const axios = require("axios");
const classroomService = (function() {
  function fetchClasses(token) {
      return axios.get("/api/classrooms", {
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