import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CardMission from "../../src/components/CardMission.vue";
import Missions from "../../src/components/Missions.vue";
import { BootstrapVue } from "bootstrap-vue";
const User = require('../../src/entity/User');
const localVue = createLocalVue();
import VueRouter from 'vue-router'

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter)

describe("CardMission.vue", () => {
  const actualCampaign = { progress: 0 };
  const user = new User('teacher', 'token', {accountType: {name: 'STUDENT'}});
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: { actualCampaign: actualCampaign, missionsResponse: [], user: user },
      getters: { getActualCampaign: () => actualCampaign, getUser: () => user },
      mutations: {
        addMissionResponse: (state, missionResponse) =>
          state.missionsResponse.some((mission) => mission.id === missionResponse.id)
            ? (state.missionsResponse.find(
                (mission) => mission.id === missionResponse.id
              ).answer = missionResponse.answer)
            : state.missionsResponse.push(missionResponse),
      },
    });
  });

  it("selected has no value", () => {
    const wrapper = mount(CardMission, {
      store,
      localVue,
      propsData: {
        mission: { id: 1, answer: "", options: [{id: 1, responseValue:"hola"}] },
      },
    });
    expect(wrapper.vm.selected).toMatch("");
  });

  it("selected has value from prop task answer", () => {
    const wrapper = mount(CardMission, {
      store,
      localVue,
      propsData: {
        mission: { id: 1, answer: "2" ,options: [{id: 1, responseValue:"hola"}] },
      },
    });
    expect(wrapper.vm.selected).toMatch("2");
  });
});

describe("Missions.vue", () => {
  const actualCampaign = { progress: 0 };
  const missions = [];
  const missionsResponse = [];
  const user = new User('teacher', 'token', {accountType: {name: 'STUDENT'}});
  let store;
  const router = new VueRouter()

  beforeEach(() => {
    store = new Vuex.Store({
      state: { actualCampaign: actualCampaign, missions: missions, missionsRespose: missionsResponse, user: user },
      getters: {
        getMissions: (state) => (campaignId) => missions,
        getActualCampaign: () => actualCampaign,
        getMissionsResponse: () => missionsResponse,
        getUser: () => user
      },
      actions: { fetchMissions: () => [] },
    });
  });

  it("has campaignId prop", () => {
    const wrapper = mount(Missions, {
      store,
      localVue,
      router,
      propsData: {
        campaignId: 1,
      },
    });

    expect(wrapper.props("campaignId")).toBe(1);
  });
});
