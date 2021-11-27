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
              caption="First slide"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="../assets/image1.jpg"
            ></b-carousel-slide>

            <b-carousel-slide img-src="../assets/image2.jpg">
              <h1>Hello world!</h1>
            </b-carousel-slide>

            <b-carousel-slide img-src="../assets/image3.jpg"></b-carousel-slide>
          </b-carousel>
        </b-col>
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
</style>