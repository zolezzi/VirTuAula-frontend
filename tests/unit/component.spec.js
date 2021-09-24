import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex'
import CardTask from "../../src/components/CardTask.vue";
import { BootstrapVue} from 'bootstrap-vue'
const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe("CardTask.vue", () => {
  const actualLesson = { progress: 0 };
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: { actualLesson: actualLesson, tasksResponse: [] },
      getters: { getActualLesson: () => actualLesson },
      mutations: {addTaskResponse: (state, taskResponse) => state.tasksResponse.some(task => task.id === taskResponse.id) ? state.tasksResponse.find(task=> task.id === taskResponse.id).answer = taskResponse.answer : state.tasksResponse.push(taskResponse)}
    });
  });

  it("selected has no value", () => {
    const wrapper = mount(CardTask, {
      store,
      localVue,
      propsData: {
        task: { id: 1, answer: "" },
      },
    });
    expect(wrapper.vm.selected).toMatch("");
  });

  it("selected has value from prop task answer", () => {
    const wrapper = mount(CardTask, {
      store,
      localVue,
      propsData: {
        task: { id: 1, answer: "2" },
      },
    });
    expect(wrapper.vm.selected).toMatch("2");
  });
  
});
