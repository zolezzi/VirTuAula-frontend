import Vue from "vue";
import Vuex from "vuex";
const User = require("../entity/User");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    actualNewGame: {},
    actualCampaign: {},
    missionsResponse: [],
    user: new User(),
    newMissions: [],
  },
  getters: {
    getActualNewGame: (state) => state.actualNewGame,
    getActualCampaign: (state) => state.actualCampaign,
    getMissionsResponse: (state) => state.missionsResponse,
    getUser: (state) => state.user,
    getNewMissions: (state) => state.newMissions,
  },
  mutations: {
    addActualNewGame: (state, newGame) =>
      (state.actualNewGame = newGame),
    addActualCampaign: (state, campaign) => (state.actualCampaign = campaign),
    addMissionResponse: (state, missionResponse) => {
      if (state.missionsResponse.some((mission) => mission.id === missionResponse.id)) {
        let mission = state.missionsResponse.find(
          (mission) => mission.id === missionResponse.id
        );
        mission.answerId = missionResponse.answerId;
        mission.story = missionResponse.story;
      } else {
        state.missionsResponse.push(missionResponse);
      }
    },
    resetMissionResponse: (state) => (state.missionsResponse = []),
    addUser: (state, user) => (state.user = user),
    addNewMission: (state, mission) => state.newMissions.push(mission),
    resetNewMissions: (state) => (state.newMissions = []),
  },
  actions: {},
  modules: {},
});
