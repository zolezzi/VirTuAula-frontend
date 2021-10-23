<template>
  <b-container>
    <b-col align="center">
      <b-card
        title="Register Teacher Account"
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
          id="firstname"
          type="text"
          placeholder="firstname"
          required
          :state="firstnameValid"
          v-model="firstname"
          aria-describedby="input-firstname-feedback"
          class="mt-4"
          @focus="focus = true"
          @blur="focus = false"
        ></b-form-input>
        <b-form-invalid-feedback align="start" id="input-firstname-feedback">
          Enter at least 3 letters
        </b-form-invalid-feedback>
        <b-form-input
          id="lastname"
          type="text"
          placeholder="lastname"
          required
          v-model="lastname"
          aria-describedby="input-lastname-feedback"
          :state="lastnameValid"
          class="mt-4"
          @focus="focus = true"
          @blur="focus = false"
        ></b-form-input>
        <b-form-invalid-feedback align="start" id="input-lastname-feedback">
          Enter an valid lastname
        </b-form-invalid-feedback>
        <b-form-input
          id="dni"
          type="number"
          placeholder="dni"
          required
          v-model="dni"
          :state="dniValid"
          class="mt-4"
        ></b-form-input>
        <b-container class="mt-4">
          <b-row align-h="center">
            <template v-if="spinner">
              <b-spinner variant="warning" label="Spinning"></b-spinner>
            </template>
            <template v-else>
              <b-button variant="warning" @click="register"
                >Register Account</b-button
              >
            </template>
          </b-row>
        </b-container>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
const accountService = require("../services/account-service");

export default {
  data() {
    return {
      hide: false,
      firstname: "",
      lastname: "",
      dni: undefined,
      focus: true,
      spinner: false,
    };
  },
  computed: {
    firstnameValid() {
      if (this.firstname.length > 0) {
        return true;
      } else {
        return null;
      }
    },
    lastnameValid() {
      if (this.lastname.length > 0) {
        return true;
      } else {
        return null;
      }
    },
    dniValid() {
      if (this.dni) {
        return true;
      } else {
        return null;
      }
    },
  },
  methods: {
    register() {
      if (this.firstname && this.lastname && this.dni) {
        this.spinner = true;
        const body = {
          firstname: this.firstname,
          lastname: this.lastname,
          dni: this.dni,
          username: this.username
        };
        accountService
          .createAccount(
            this.$store.getters.getUser.getToken(),
            this.$store.getters.getUser.getUserId(),
            body
          )
          .then((response)=> this.$store.getters.getUser.setAccount(response.data))
          .then(() => (this.spinner = false))
          .then(() => {
            this.hide = true;
            setTimeout(() => this.$router.push("/"), 500);
          })
          .then(() =>
            this.makeToast("success", "awesome", "registration-success")
          )
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
  },
};
</script>

<style scoped>
</style>