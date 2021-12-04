<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col cols="11">
          <h2
            :class="
              hide
                ? 'animate__animated animate__zoomOut animate__faster'
                : 'animate__animated animate__bounceInDown animate__faster'
            "
          >
            New Games
          </h2>
          <NewGames class="mt-1" />
        </b-col>
        <b-col v-show="!isMobile" cols="1" class="virtuaula-calendar">
          <b-calendar
            :class="
              hide
                ? 'animate__animated animate__zoomOut animate__faster'
                : 'animate__animated animate__bounceInDown animate__faster'
            "
            locale="en-US"
          ></b-calendar>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NewGames from "@/components/NewGames.vue";
import accountService from "../services/account-service";

export default {
  name: "Home",
  components: {
    NewGames,
  },
  data() {
    return {
      hide: false,
    };
  },
  mounted() {
    if (!this.$store.getters.getUser.isLeader()) {
      accountService
        .getLifes(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then((response) => this.$store.commit("addLifes", response.data))
        .catch((error) => console.log(error));
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth < 800;
    },
  },
};
</script>
<style scoped>
.virtuaula-calendar {
  margin-top: 6rem !important;
}
</style>