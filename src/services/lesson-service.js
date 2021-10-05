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

  function create(classroomId, token, accountId, lesson) {
    return axios.post(`/api/lessons/create/${classroomId}/${accountId}`, lesson, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });    
  }

  return {
    completeTask: completeTask,
    fetchLessons: fetchLessons,
    create: create
  };
})();

module.exports = lessonService;
