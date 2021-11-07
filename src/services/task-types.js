const axios = require("axios");
const taskTypeService = (function() {
  function fetchTasksTypes(token) {
      return axios.get(`/api/task-types`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }

  return {
    fetchTasksTypes: fetchTasksTypes
  };
})();

module.exports = taskTypeService;