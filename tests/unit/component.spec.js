import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CardTask from "../../src/components/CardTask.vue";
import Tasks from "../../src/components/Tasks.vue";
import { BootstrapVue } from "bootstrap-vue";
const User = require('../../src/entity/User');
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("CardTask.vue", () => {
  const actualLesson = { progress: 0 };
  const user = new User('teacher', 'token', {accountType: {name: 'STUDENT'}});
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: { actualLesson: actualLesson, tasksResponse: [], user: user },
      getters: { getActualLesson: () => actualLesson, getUser: () => user },
      mutations: {
        addTaskResponse: (state, taskResponse) =>
          state.tasksResponse.some((task) => task.id === taskResponse.id)
            ? (state.tasksResponse.find(
                (task) => task.id === taskResponse.id
              ).answer = taskResponse.answer)
            : state.tasksResponse.push(taskResponse),
      },
    });
  });

  it("selected has no value", () => {
    const wrapper = mount(CardTask, {
      store,
      localVue,
      propsData: {
        task: { id: 1, answer: "", options: [{id: 1, responseValue:"hola"}] },
      },
    });
    expect(wrapper.vm.selected).toMatch("");
  });

  it("selected has value from prop task answer", () => {
    const wrapper = mount(CardTask, {
      store,
      localVue,
      propsData: {
        task: { id: 1, answer: "2" ,options: [{id: 1, responseValue:"hola"}] },
      },
    });
    expect(wrapper.vm.selected).toMatch("2");
  });
});

describe("Tasks.vue", () => {
  const actualLesson = { progress: 0 };
  const tasks = [];
  const tasksResponse = [];
  const user = new User('teacher', 'token', {accountType: {name: 'STUDENT'}});
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: { actualLesson: actualLesson, tasks: tasks, tasksRespose: tasksResponse, user: user },
      getters: {
        getTasks: (state) => (lessonId) => tasks,
        getActualLesson: () => actualLesson,
        getTasksResponse: () => tasksResponse,
        getUser: () => user
      },
      actions: { fetchTasks: () => [] },
    });
  });

  it("has lessonId prop", () => {
    const wrapper = mount(Tasks, {
      store,
      localVue,
      propsData: {
        lessonId: 1,
      },
    });

    expect(wrapper.props("lessonId")).toBe(1);
  });
});
