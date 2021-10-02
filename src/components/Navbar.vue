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
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-show="this.$store.getters.getToken" class="virtuaula-guest">
          {{this.$store.getters.getUsername}}
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
</style>
