const axios = require("axios");
const lessonService = (function() {
  function completeTask(classroomId, lessonId, tasks, token) {
    return axios.post(`/api/lessons/${classroomId}/${lessonId}`, tasks, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  function fetchLessons(classroomId, token) {
    return axios.get(`/api/lessons/${classroomId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  return {
    completeTask: completeTask,
    fetchLessons: fetchLessons,
  };
})();

module.exports = lessonService;
