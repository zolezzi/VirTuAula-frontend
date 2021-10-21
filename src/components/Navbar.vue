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
      <b-navbar-nav v-if="this.$store.getters.getUser.account" class="ml-auto">
        <div v-show="!this.$store.getters.getUser.isTeacher()" class="virtuaula-experience">
          <h5 class="virtuaula-h5">Exp:</h5>
          <b-progress
            variant="warning"
            :value="this.$store.getters.getUser.getExperience()"
            show-progress
            animated
            class="virtuaula-progress"
          ></b-progress>
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
export default {
  name: "Navbar",
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
