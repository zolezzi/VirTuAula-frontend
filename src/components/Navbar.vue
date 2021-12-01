<template>
  <div>
    <b-navbar type="dark" variant="secondary">
      <b-navbar-nav @click="redirect()" class="virtuaula-logo">
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
      <b-navbar-nav
        v-show="
          this.$store.getters.getUser.isLeader() &&
          !(currentRouteName === 'Players')
        "
        class="
          ml-5
          mt-2
          virtuaula-img
          animate__animated animate__zoomIn
          virtuaula-players
        "
      >
        <b-nav-item class="virtuaula-add" @click="addPlayers()"
          >Add Players</b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav
        v-show="
          this.$store.getters.getUser.isLeader() &&
          !(currentRouteName === 'Teams')
        "
        :class="currentRouteName === 'Players' ? 'ml-5' : ''"
        class="
          mt-2
          virtuaula-img
          animate__animated animate__zoomIn
          virtuaula-players
        "
      >
        <b-nav-item class="virtuaula-add" @click="adminTeams()"
          >Teams</b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav
        v-if="
          !this.$store.getters.getUser.account && currentRouteName === 'Public'
        "
        class="ml-auto"
      >
        <b-nav-item @click="register()">Register</b-nav-item>
        <b-nav-item @click="login()">Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="this.$store.getters.getUser.account" class="ml-auto">
        <div
          v-if="
            !this.$store.getters.getUser.isLeader() &&
            this.$store.getters.getUser.getLevel()
          "
          class="virtuaula-experience"
        >
          <b-badge variant="warning" class="mr-2 ml-2 mb-1">
            <div v-if="!isMobile">
              <h5 class="virtuaula-h5" id="virtuaula-popover">
                {{
                  this.$store.getters.getUser.getLevel().getName() +
                  " Lvl." +
                  this.$store.getters.getUser.getLevel().getNumberLevel()
                }}
              </h5>
              <b-popover
                :disabled="this.$store.getters.getBuffers.length === 0"
                target="virtuaula-popover"
                triggers="hover"
                placement="bottom"
              >
                <template #title>Benefits</template>
                <b-list-group>
                  <template
                    v-for="(buffer, index) in this.$store.getters.getBuffers"
                  >
                    <b-list-group-item :key="index"
                      ><b>{{
                        buffer.name.charAt(0).toUpperCase() +
                        buffer.name.slice(1)
                      }}</b
                      >: {{ buffer.description }}</b-list-group-item
                    >
                  </template>
                </b-list-group>
              </b-popover>
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
            :max="this.$store.getters.getUser.getLevel().getMaxValue()"
            :text="
              this.$store.getters.getUser.getExperience() +
              '/' +
              this.$store.getters.getUser.getLevel().getMaxValue()
            "
          ></progress-bar>
        </div>
        <b-nav-text
          v-show="this.$store.getters.getUser.getToken()"
          class="virtuaula-guest ml-3"
        >
          {{ this.$store.getters.getUser.getUsername() }}
          <b-avatar
            variant="warning"
            class="ml-2"
            id="virtuaula-popover-goals"
          ></b-avatar>
          <b-popover
            :disabled="this.$store.getters.getGoals.length === 0"
            target="virtuaula-popover-goals"
            triggers="hover"
            placement="bottomleft"
          >
            <template #title>Goals</template>
            <b-list-group>
              <template v-for="(goal, index) in this.$store.getters.getGoals">
                <b-list-group-item :key="index"
                  ><b>{{
                    goal.name.charAt(0).toUpperCase() + goal.name.slice(1)
                  }}</b
                  >: {{ goal.description }}</b-list-group-item
                >
              </template>
            </b-list-group>
          </b-popover>
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import ProgressBar from "vue-simple-progress";

export default {
  name: "Navbar",
  components: {
    ProgressBar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isMobile() {
      return window.innerWidth < 800;
    },
  },
  methods: {
    addPlayers() {
      setTimeout(() => this.$router.push({ name: "Players" }), 500);
    },
    adminTeams() {
      setTimeout(() => this.$router.push({ name: "Teams" }), 500);
    },
    login() {
      setTimeout(() => this.$router.push({ name: "Login" }), 500);
    },
    register() {
      setTimeout(() => this.$router.push({ name: "Register" }), 500);
    },
    redirect() {
      if (
        this.$store.getters.getUser.account &&
        this.currentRouteName !== "Home"
      ) {
        setTimeout(() => this.$router.push({ name: "Home" }), 500);
      } else if (
        !this.$store.getters.getUser.account &&
        this.currentRouteName !== "Public"
      ) {
        setTimeout(() => this.$router.push({ name: "Public" }), 500);
      }
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
  color: orange;
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

.virtuaula-players:hover {
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
