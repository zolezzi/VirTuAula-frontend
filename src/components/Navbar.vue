<template>
  <div>
    <b-navbar type="dark" variant="secondary">
      <router-link to="/" class="virtuaula-link">
        <b-navbar-nav class="virtuaula-logo">
          <div class="virtuaula-box">
            <img
              class="virtuaula-img animate__animated animate__bounceInLeft"
              src="../assets/logo.png"
              alt="logo"
              width="100"
              height="80"
            />
            <p class="virtuaula-text animate__animated animate__bounceInRight">
              VirTuAula
            </p>
          </div>
        </b-navbar-nav>
      </router-link>
      <b-navbar-nav
        v-show="
          this.$store.getters.getUser.isTeacher() &&
          !(currentRouteName === 'Students')
        "
        class="
          ml-5
          mt-2
          virtuaula-img
          animate__animated animate__zoomIn
          virtuaula-students
        "
      >
        <b-nav-item @click="addStudents()">Add Students</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="this.$store.getters.getUser.account" class="ml-auto">
        <div
          v-if="!this.$store.getters.getUser.isTeacher() && this.$store.getters.getUser.getLevel()"
          class="virtuaula-experience"
        >
          <b-badge variant="warning" class="mr-2 ml-2 mb-1">
            <div v-if="!isMobile">
              <h5 class="virtuaula-h5">
                {{
                  this.$store.getters.getUser.getLevel().getName() +
                  " Lvl." +
                  this.$store.getters.getUser.getLevel().getNumberLevel()
                }}
              </h5>
            </div>
            <div v-else>
              <h5 class="virtuaula-h5">
                {{
                  "Lvl." +
                  this.$store.getters.getUser.getLevel().getNumberLevel()
                }}
              </h5>
            </div>
          </b-badge>
          <progress-bar
            bar-color="#ffc107"
            :val="this.$store.getters.getUser.getExperience()"
            size="8"
            max="1000"
            :text="this.$store.getters.getUser.getExperience() + '/1000'"
          ></progress-bar>
        </div>
        <b-nav-text
          v-show="this.$store.getters.getUser.getToken()"
          class="virtuaula-guest"
        >
          {{ this.$store.getters.getUser.getUsername() }}
          <b-avatar variant="warning ml-2"></b-avatar>
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";

export default {
  name: "Navbar",
  data() {
    return {
      isMobile: window.innerWidth < 800
    }
  },
  components: {
    ProgressBar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    addStudents() {
      setTimeout(() => this.$router.push({ name: "Students" }), 500);
    },
  },
};
</script>

<style scoped>
.virtuaula-box {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 200px;
  height: 60px;
}

.virtuaula-text {
  font-size: 2rem;
  color: #ffc107;
  font-family: "Gagalin";
  padding-left: 5%;
  margin-bottom: 0;
  margin-top: 3%;
  border-left: lightgrey solid 2px;
}

.virtuaula-img {
  object-fit: contain;
}

.virtuaula-guest {
  display: flex;
  align-items: center;
}

.virtuaula-link {
  color: inherit;
  text-decoration: inherit;
}

.virtuaula-students:hover {
  color: #808080;
}

/* Mobile */

@media (max-width: 600px) {
  .virtuaula-text {
    padding-left: 2%;
    margin-top: 0;
  }

  .virtuaula-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .virtuaula-img {
    margin-top: 7%;
  }

  .virtuaula-guest {
    display: none;
  }

  .virtuaula-logo {
    margin: auto;
  }
}

@media (max-width: 414px) {
  div.virtuaula-experience {
    width: 8rem;
    flex-direction: column;
  }
}

@media (max-width: 376px) {
  div.virtuaula-experience {
    width: 6rem;
    flex-direction: column;
  }
}

@media (max-width: 361px) {
  div.virtuaula-experience {
    width: 5rem;
    flex-direction: column;
  }
}
@media (max-width: 320px) {
  div.virtuaula-experience {
    width: 3rem;
    flex-direction: column;
  }
}

.virtuaula-experience {
  display: flex;
  align-items: center;
  width: 15rem;
}

.virtuaula-progress {
  margin-left: 2%;
  margin-right: 12%;
  width: 100%;
}

.virtuaula-h5 {
  margin-bottom: 0;
}
</style>
