const axios = require("axios");
const taskService = (function() {
  function fetchTasks(lessonId, token, accountId) {
      return axios.get(`/api/tasks/students/${lessonId}/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }
  function fetchTasksTeacher(lessonId, accountId, token) {
    return axios.get(`/api/tasks/${lessonId}/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
}

  return {
    fetchTasks: fetchTasks,
    fetchTasksTeacher: fetchTasksTeacher
  };
})();

module.exports = taskService;