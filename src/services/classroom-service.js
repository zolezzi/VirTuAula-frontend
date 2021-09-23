const axios = require("axios");
const classroomService = (function() {
  function fetchClasses() {
      return axios.get("/classrooms");
  }

  return {
      fetchClasses: fetchClasses
  };
})();

module.exports = classroomService;