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
              <b-form-group>
                <template v-for="option in task.options">
                  <b-form-radio
                    v-model="selected"
                    :disabled="disabled === 100"
                    :key="option.id"
                    :value="option.id"
                    >{{ option.responseValue }}</b-form-radio
                  >
                </template>
              </b-form-group>
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
      timer: null,
      selected: this.task.answer,
      disabled: this.$store.getters.getActualLesson.progress,
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
  },
};
</script>

<style scoped>
.virtuaula-card {
  width: 30rem;
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