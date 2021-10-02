const axios = require("axios");
const taskService = (function() {
  function fetchTasks(lessonId, token) {
      return axios.get(`/api/tasks/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }

  return {
    fetchTasks: fetchTasks
  };
})();

module.exports = taskService;