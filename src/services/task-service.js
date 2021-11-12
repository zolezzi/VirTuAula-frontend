const axios = require("axios");
const taskService = (function() {
  function fetchTasks(campaignId, token, accountId) {
      return axios.get(`/api/missions/players/${campaignId}/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  }
  function fetchTasksTeacher(campaignId, accountId, token) {
    return axios.get(`/api/missions/${campaignId}/${accountId}`, {
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