<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Login"
        style="max-width: 20rem"
        align="center"
        class="mt-5"
        :class="
          hide
            ? 'animate__animated animate__zoomOut'
            : 'animate__animated animate__zoomInDown'
        "
      >
        <b-form-input
          id="username"
          type="text"
          placeholder="Username"
          required
          v-model="username"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="password"
          type="password"
          placeholder="Password"
          required
          v-model="password"
          class="mt-4"
          @keyup.enter="login"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-warning" @click="register"
              >Sign-Up</b-button
            >
            <template v-if="spinner">
              <b-spinner variant="warning" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="warning" @click="login"> Login </b-button>
            </template>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
let sha256 = require("js-sha256");
let User = require("../entity/User");
const accountService = require("../services/account-service");

import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      hide: false,
      username: "",
      password: "",
      spinner: false,
    };
  },
  computed: {
    encodedPassword() {
      return sha256(this.password);
    },
  },
  methods: {
    login() {
      this.spinner = true;
      const body = {
        username: this.username,
        password: this.encodedPassword,
      };
      axios
        .post("/login", body)
        .then((response) => {
          let user = new User(
            response.data.userId,
            response.data.username,
            response.data.token,
            response.data.account
          );
          this.$store.commit("addUser", user);
        })
        .then(() => (this.spinner = false))
        .then(() => {
          if (!this.$store.getters.getUser.hasAccount()) {
            this.$router.push("/add-account");
          } else {
            if (!this.$store.getters.getUser.isLeader()) {
              this.addExperience();
              this.addLevel();
              this.addBuffers();
              this.addGoals();
            }
            this.$router.push("/home");
          }
        })
        .then(() => this.makeToast("success", "Login", "Successful Login"))
        .catch(() => {
          this.spinner = false;
          this.makeToast("danger", "Login", "Login failed");
        });
    },
    register() {
      this.hide = true;
      setTimeout(() => this.$router.push("/register"), 500);
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
    addExperience() {
      accountService
        .getExperience(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then((response) =>
          this.$store.getters.getUser.setExperience(response.data)
        );
    },
    addLevel() {
      accountService
        .getLevel(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then((response) =>
          this.$store.getters.getUser.setLevel(response.data)
        );
    },
    addBuffers() {
      accountService
        .getBuffers(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then((response) => this.$store.commit("addBuffers", response.data));
    },
    addGoals() {
      accountService
        .getGoals(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId()
        )
        .then((response) => this.$store.commit("addGoals", response.data));
    },
  },
};
</script>

<style scoped>
</style>