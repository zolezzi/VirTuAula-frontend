<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Sign-Up"
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
          placeholder="username"
          required
          :state="userValid"
          v-model="username"
          aria-describedby="input-username-feedback"
          class="mt-4"
          @focus="focus = true"
          @blur="focus = false"
        ></b-form-input>
        <b-form-invalid-feedback align="start" id="input-username-feedback">
          Enter at least 3 letters
        </b-form-invalid-feedback>
        <b-form-input
          id="email"
          type="email"
          placeholder="email"
          required
          v-model="email"
          aria-describedby="input-email-feedback"
          :state="emailValid"
          class="mt-4"
          @focus="focus = true"
          @blur="focus = false"
        ></b-form-input>
        <b-form-invalid-feedback align="start" id="input-email-feedback">
          Enter an valid email
        </b-form-invalid-feedback>
        <b-form-input
          id="password"
          type="password"
          placeholder="password"
          required
          v-model="password"
          :state="passValid"
          class="mt-4"
        ></b-form-input>
        <b-form-input
          id="confirmation"
          type="password"
          placeholder="confirmation"
          required
          v-model="confirmation"
          :state="confirmValid"
          class="mt-4"
          @keyup.enter="register"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="between">
            <b-button variant="outline-warning" @click="login">
              Sign-In
            </b-button>
            <template v-if="spinner">
              <b-spinner variant="warning" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="warning" @click="register">Register</b-button>
            </template>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
let sha256 = require("js-sha256");
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      hide: false,
      username: "",
      email: "",
      password: "",
      confirmation: "",
      focus: true,
      spinner: false,
    };
  },
  computed: {
    passValid() {
      if (this.password.length > 0) {
        return true;
      } else {
        return null;
      }
    },
    confirmValid() {
      if (
        this.confirmation.length > 0 &&
        this.password > 0 &&
        this.confirmation.length >= this.password.length
      ) {
        return this.confirmation === this.password;
      } else {
        return null;
      }
    },
    userValid() {
      if (!this.focus) {
        return this.username.length > 3;
      } else {
        return null;
      }
    },
    emailValid() {
      const re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (this.email.length > 0) {
        return re.test(String(this.email).toLowerCase());
      } else {
        return null;
      }
    },
    encodedPassword() {
      return sha256(this.password);
    },
  },
  methods: {
    register() {
      if (this.userValid && this.passValid && this.confirmValid) {
        this.spinner = true;
        const body = {
          username: this.username,
          password: this.encodedPassword,
          repeatPassword: this.encodedPassword,
          email: this.email,
        };
        axios
          .post("/register", body)
          .then(() => (this.spinner = false))
          .then(() =>
            this.makeToast("success", "awesome", "registration-success")
          )
          .then(() => {
            this.hide = true;
            setTimeout(() => this.$router.push("/login"), 1500);
          })
          .catch(() => {
            this.spinner = false;
            this.makeToast("danger", "sorry", "registration-fail");
          });
      } else {
        this.makeToast("danger", "sorry", "registration-fail");
      }
    },
    makeToast(variant, title, bodyMessage) {
      this.$bvToast.toast(bodyMessage, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-right",
        solid: true,
      });
    },
    login() {
      this.hide = true;
      setTimeout(() => this.$router.push("/login"), 500);
    },
  },
};
</script>

<style scoped>
</style>