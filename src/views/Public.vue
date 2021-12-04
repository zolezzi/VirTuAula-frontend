<template>
  <div class="mt-3">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              caption="Learning is amazing!"
              text="Children are the future, that is why they should learn and what better way to learn than by playing."
              img-src="../assets/image1.jpg"
            ></b-carousel-slide>

            <b-carousel-slide
              caption="All children like to play"
              text="Improve your learning and teaching techniques."
              img-src="../assets/image2.jpg"
            >
            </b-carousel-slide>

            <b-carousel-slide
              caption="Complete amazing missions!"
              text="Gain experience to have better benefits."
              img-src="../assets/image3.jpg"
            ></b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center mt-5">
        <b-col align-self="center"
          ><b-card class="virtuaula-card mb-2"
            ><b-icon
              icon="binoculars-fill"
              variant="warning"
              font-scale="3"
            ></b-icon>
            <h2>Complete Games</h2></b-card
          ></b-col
        >
        <b-col align-self="center"
          ><b-card class="virtuaula-card mb-2"
            ><b-icon icon="bricks" variant="danger" font-scale="3"></b-icon>
            <h2>Make Missions</h2></b-card
          ></b-col
        >
        <b-col align-self="center"
          ><b-card class="virtuaula-card mb-2"
            ><b-icon
              icon="capslock-fill"
              variant="primary"
              font-scale="3"
            ></b-icon>
            <h2>Gain Experience</h2></b-card
          ></b-col
        >
        <b-col align-self="center"
          ><b-card class="virtuaula-card mb-2"
            ><b-icon icon="cash" variant="success" font-scale="3"></b-icon>
            <h2>Obtain Benefits</h2></b-card
          ></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.virtuaula-card {
  background-color: #e0e0e0;
  width: 255px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
</style>