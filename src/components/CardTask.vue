<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-col>
      <b-container>
        <b-row>
          <b-col>
            <b-card
              img-alt="lesson"
              img-left
              :title="task.statement"
              class="mb-3 virtuaula-card"
            >
              <template v-if="task.taskTypeId === 1">
                <b-form-group class="virtuaula-group">
                  <b-form-radio-group
                    class="virtuaula-options"
                    stacked
                    v-model="selected"
                    :disabled="disabled === 100 || isTeacher"
                    :options="options"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </template>
              <template v-if="task.taskTypeId === 2 && !this.$store.getters.getUser.isTeacher()" >
                <label class="mt-2 virtuaula-label" for="virtuaula-story"
                  >Tell a Story</label
                >
                <b-form-textarea
                  id="virtuaula-story"
                  v-model="storyWrited"
                  placeholder="Tell a story..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      max: 100,
      options: this.task.options.map((option) => {
        return { text: option.responseValue, value: option.id };
      }),
      timer: null,
      selected: this.$store.getters.getUser.isTeacher()
        ? this.task.correctAnswer
        : this.task.answer,
      disabled: this.$store.getters.getActualLesson.progress,
      isTeacher: this.$store.getters.getUser.isTeacher(),
      storyWrited: this.task.story ? this.task.story: ""
    };
  },
  props: ["task", "hide"],
  watch: {
    selected(newSelected) {
      if (newSelected) {
        this.task.answer = this.selected;
        this.$store.commit("addTaskResponse", {
          id: this.task.id,
          answerId: newSelected,
        });
      }
    },
    storyWrited(newStory) {
      if(newStory) {
        this.task.answer = this.options[0].value;
        this.$store.commit("addTaskResponse", {
          id: this.task.id,
          answerId: this.options[0].value,
          story: newStory
        })
      }
    }
  },
};
</script>

<style scoped>
.virtuaula-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.virtuaula-options {
  text-align: start;
}

.virtuaula-card {
  width: 30rem;
  height: 15rem;
}
@media (max-width: 600px) {
  .virtuaula-card {
    width: 22rem;
  }
}

@media (max-width: 400px) {
  .virtuaula-card {
    width: 18rem;
  }
}
</style>