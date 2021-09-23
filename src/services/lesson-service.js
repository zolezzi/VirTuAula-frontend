const axios = require("axios");
const lessonService = (function() {
  function completeTask(classroomId, lessonId, tasks) {
    return axios.post(`/lessons/${classroomId}/${lessonId}`, tasks);
  }

  function fetchLessons(classroomId) {
    return axios.get(`/lessons/${classroomId}`);
  }

  return {
    completeTask: completeTask,
    fetchLessons: fetchLessons,
  };
})();

module.exports = lessonService;
