<template>
  <div>
    <b-card
      :title="classroomName"
      img-src="../assets/classroom.png"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary" class="m-auto">Ingresar</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
    name: "Card",
    props: ['classroomName']
}
</script>

<style scoped>

</style>