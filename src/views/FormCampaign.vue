<template>
  <div
    :class="
      hide
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster'
    "
  >
    <b-container>
      <b-row align-h="center">
        <h2>Add a Campaign</h2>
      </b-row>
      <Back
      backRoute="NewGame"
      class="mb-2"
      :class="
        hide
          ? 'animate__animated animate__zoomOut animate__faster'
          : 'animate__animated animate__bounceInDown animate__faster'
      "
    />
      <b-row align-h="center" class="mt-4 mb-4">
        <b-card class="virtuaula-card">
          <b-form>
            <b-container>
              <b-row>
                <label class="virtuaula-label" for="virtuaula-campaign-name"
                  >Campaign Name</label
                >
                <b-input
                  id="virtuaula-campaign-name"
                  v-model="name"
                  placeholder="Campaign name"
                ></b-input>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="6" class="virtuaula-delivery-date-form">
                  <label for="virtuaula-delivery-date"
                    >Choose a delivery date</label
                  >
                  <b-form-datepicker
                    id="virtuaula-delivery-date"
                    v-model="deliveryDate"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      weekday: 'short',
                    }"
                    class="mb-2"
                  ></b-form-datepicker>
                </b-col>
                <b-col cols="12" md="6" class="virtuaula-delivery-hour-form">
                  <label for="virtuaula-delivery-hour"
                    >Choose a delivery hour</label
                  >
                  <b-form-timepicker
                    id="virtuaula-delivery-hour"
                    v-model="deliveryHour"
                    placeholder="Choose a time"
                    locale="en"
                  ></b-form-timepicker>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="12" md="7" class="virtuaula-column">
                  <label class="virtuaula-label" for="virtuaula-campaign-note"
                    >Max Note</label
                  >
                  <b-input
                    type="number"
                    id="virtuaula-campaign-note"
                    v-model="note"
                    placeholder="Campaign note"
                  ></b-input>
                </b-col>
                <b-col>
                  <b-button
                    class="virtuaula-button"
                    variant="warning"
                    @click="addMission"
                    >+ Add Mission</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-card>
      </b-row>
      <b-row align-h="center" class="mt-4 mb-4">
        <template v-for="(mission, index) in missions">
          <b-card class="mt-2 ml-2 virtuaula-card" :key="index">
            <h2>Mission {{ index + 1 }}</h2>
            <div class="virtuaula-mission-info">
              <p>Statement: {{ mission.statement }}</p>
              <p>Score: {{ mission.score }}</p>
              <template v-for="(option, index) in mission.options">
                <p :key="index">
                  Option {{ index + 1 }}: {{ option.responseValue }}
                </p>
              </template>
            </div>
          </b-card>
        </template>
      </b-row>
      <b-row align-h="center">
        <b-button variant="success" :disabled="!completed" @click="create"
          >Create</b-button
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import campaignService from "../services/campaign-service";
import Back from "../components/Back.vue";

export default {
  name: "FormCampaign",
  components: {
    Back
  },
  data() {
    return {
      hide: false,
      name: "",
      note: undefined,
      missions: this.$store.getters.getNewMissions,
      deliveryDate: undefined,
      deliveryHour: undefined,
    };
  },
  computed: {
    completed() {
      console.log(this.deliveryDate, this.deliveryHour);
      return (
        this.name &&
        this.note &&
        this.$store.getters.getNewMissions.length > 0 &&
        this.deliveryDate &&
        this.deliveryHour
      );
    },
  },
  methods: {
    create() {
      if (this.completed) {
        campaignService.create(
          this.$store.getters.getActualNewGame.id,
          this.$store.getters.getUser.getToken(),
          this.$store.getters.getUser.getAccountId(),
          {
            name: this.name,
            maxNote: this.note,
            missions: this.$store.getters.getNewMissions,
            deliveryDate: `${this.deliveryDate} ${this.deliveryHour}`,
          }
        );
        this.hide = true;
        this.$store.commit("resetNewMissions");
        setTimeout(() => this.$router.push({ name: "NewGame" }), 500);
      }
    },
    addMission() {
      this.hide = true;
      setTimeout(() => this.$router.push({ name: "FormMission" }), 500);
    },
  },
};
</script>

<style scoped>
.virtuaula-label {
  float: left;
}

.virtuaula-card {
  width: 30rem;
}

.virtuaula-button {
  margin-top: 21%;
}

.virtuaula-column {
  padding: 0;
}

@media (max-width: 600px) {
  .virtuaula-card {
    width: 22rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }

  .virtuaula-delivery-date-form {
    padding-right: 0;
  }
  .virtuaula-delivery-hour-form {
    padding-left: 0;
  }
}

@media (max-width: 400px) {
  .virtuaula-card {
    width: 18rem;
  }
  .virtuaula-button {
    margin-top: 10%;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.virtuaula-separator {
  border-top: 2px #c1c1c1 solid;
}

.virtuaula-mission-info {
  text-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.virtuaula-delivery-date-form {
  padding-left: 0;
}
.virtuaula-delivery-hour-form {
  padding-right: 0;
}
</style>