<template>
    <b-row align-h="center" class="mt-4 mb-4">
        <b-card style="width:400px;">
          <b-form>
            <label for="virtuaula-lesson-name">Lesson Name</label>
            <b-input
              id="virtuaula-lesson-name"
              v-model="name"
              placeholder="Lesson name"
            ></b-input>
          </b-form>
        </b-card>
      </b-row>
</template>

<script>
export default {
    data() {
        return {
            name: ''
        }
    },
    watch: {
    name(newName) {
      if (newName) {
        this.$store.commit("addNewLesson", {
          name: newName
        });
      } else {
          this.$store.commit("addNewLesson", {});
      }
    },
  },

}
</script>

<style scoped>

</style>