const axios = require("axios");
const campaignService = (function() {
  function fetchCampaignsLeader(newGameId, token) {
    return axios.get(`/api/campaigns/${newGameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function fetchCampaigns(newGameId, token, accountId) {
    return axios.get(`/api/campaigns/${newGameId}/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function completeMission(newGameId, missionId, missions, token, accountId) {
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

  function correctMission(campaignId, accountId, playerMission, token) {
    return axios.post(
      `/api/campaigns/correct-mission/${campaignId}/${accountId}`,
      playerMission,
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
    completeMission: completeMission,
    fetchCampaigns: fetchCampaigns,
    fetchCampaignsLeader: fetchCampaignsLeader,
    create: create,
    correctMission: correctMission,
  };
})();

module.exports = campaignService;
