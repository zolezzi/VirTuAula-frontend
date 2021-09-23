const axios = require("axios");
const taskService = (function() {
  function fetchTasks(lessonId) {
      return axios.get(`/tasks/${lessonId}`)
  }

  return {
    fetchTasks: fetchTasks
  };
})();

module.exports = taskService;