<template>
  <div>
    <b-card
      img-src="../assets/lesson.png"
      img-alt="lesson"
      img-left
      :title="lesson.name"
      class="mb-3"
    >
      <b-card-text>
        Some quick example text to build on the card and make up the bulk of the
        card's content.
      </b-card-text>
      <b-container>
        <b-row>
          <b-col cols=10>
            <b-progress :max="max" class="mt-2">
              <b-progress-bar
                :value="value"
                variant="success"
                show-progress
                :label="`${(value / max) * 100}%`"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols=1>
            <b-button href="#" variant="warning">Realizar</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      max: 100,
      timer: null
    };
  },
  props: ['lesson'],
  mounted() {
    this.timer = setInterval(() => {
      this.value = this.lesson.progress;
    }, 500);
  },
};
</script>

<style scoped>
</style>