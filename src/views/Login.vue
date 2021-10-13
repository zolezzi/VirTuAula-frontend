<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Login"
        style="max-width: 20rem"
        align="center"
        class="mt-5 animate__animated animate__zoomInDown"
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
          <b-row align-h="center">
            <template v-if="spinner">
              <b-spinner variant="warning" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="warning" @click="login">{{
                "Login"
              }}</b-button>
            </template>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
let sha256 = require("js-sha256");
let User = require('../entity/User');

import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
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
          let user = new User(response.data.username, response.data.token, response.data.account);
          this.$store.commit('addUser',user);
        })
        .then(() => (this.spinner = false))
        .then(() => this.$router.push("/"))
        .then(() => this.makeToast("success", "Login","Successful Login"))
        .catch(() => {
          this.spinner = false;
          this.makeToast("danger", "Login", "Login failed");
        });
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
</style>