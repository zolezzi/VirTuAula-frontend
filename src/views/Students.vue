<template>
  <div class="mt-3">
    <h2
      :class="
        hide
          ? 'animate__animated animate__zoomOut animate__faster'
          : 'animate__animated animate__bounceInDown animate__faster'
      "
    >
      Students
    </h2>
    <b-form
      :class="
        hide
          ? 'animate__animated animate__zoomOut animate__faster'
          : 'animate__animated animate__zoomIn animate__faster'
      "
    >
      <b-container>
        <b-row class="justify-content-md-center">
          <b-col>
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              placeholder="Choose a csv to drop..."
              drop-placeholder="Drop csv here..."
            ></b-form-file>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col>
            <div
              v-if="fileUpload"
              class="mt-4"
              :class="
                !fileUpload
                  ? 'animate__animated animate__zoomOut animate__faster'
                  : 'animate__animated animate__fadeInUp animate__faster'
              "
            >
              <h3>Total: {{ fileUpload.length }}</h3>
              <b-table
                :responsive="true"
                table-variant="light"
                head-variant="dark"
                striped
                hover
                :items="fileUpload"
              ></b-table>
              <b-button variant="success" @click="send()">Send</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import Papa from "papaparse";
import accountService from "../services/account-service";

export default {
  data() {
    return {
      file: null,
      students: [],
      hide: false,
    };
  },
  methods: {
    showCsv() {
      Papa.parse(this.file, {
        delimiter: ",",
        encoding: "UTF-8",
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.students = results.data;
        },
      });
    },
    send() {
      const formData = new FormData();
      formData.append("file", this.file);
      accountService
        .addStudents(
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId(),
          formData
        )
        .then(() => this.$router.push("/"))
        .then(() => this.makeToast("success", "Uploading", "Successful upload"))
        .catch(() => {
          this.makeToast("danger", "Uploading", "Upload failed");
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
  computed: {
    fileUpload() {
      if (this.file) {
        this.showCsv();
        return this.students;
      }
    },
  },
};
</script>

<style scoped>
</style>