const axios = require("axios");
const lessonService = (function() {
  function fetchLessonsTeacher(newGameId, token) {
    return axios.get(`/api/campaigns/${newGameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function fetchLessons(newGameId, token, accountId) {
    return axios.get(`/api/campaigns/${newGameId}/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function completeTask(newGameId, missionId, missions, token, accountId) {
    return axios.post(
      `/api/campaigns/${newGameId}/${missionId}/${accountId}`,
      missions,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  function create(newGameId, token, accountId, campaign) {
    return axios.post(
      `/api/campaigns/create/${newGameId}/${accountId}`,
      campaign,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  return {
    completeTask: completeTask,
    fetchLessons: fetchLessons,
    fetchLessonsTeacher: fetchLessonsTeacher,
    create: create,
  };
})();

module.exports = lessonService;
