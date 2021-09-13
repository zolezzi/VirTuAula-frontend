<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-container>
      <b-row>
        <b-col>
          <b-card img-alt="lesson" img-left :title="lesson.name" class="mb-3">
            <b-card-text>
              Some quick example text to build on the card and make up the bulk
              of the card's content.
            </b-card-text>
            <b-container>
              <b-row>
                <b-col cols="8" sm="9" lg="10">
                  <b-progress :max="max" class="mt-2">
                    <b-progress-bar
                      :value="value"
                      variant="success"
                      show-progress
                      :label="`${(value / max) * 100}%`"
                    ></b-progress-bar>
                  </b-progress>
                </b-col>
                <b-col cols="1" xs="2">
                  <b-button href="#" variant="warning" @click="realizar()"
                    >Realizar</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      max: 100,
      timer: null,
    };
  },
  props: ["lesson", "hide"],
  mounted() {
    this.timer = setInterval(() => {
      this.value = this.lesson.progress;
    }, 500);
  },
  methods: {
    realizar() {
      this.$emit("update", true);
      this.$store.commit("addActualLesson", this.lesson);
      setTimeout(() => this.$router.push({ name: "Lesson" }), 500);
    },
  },
};
</script>

<style scoped>
</style>