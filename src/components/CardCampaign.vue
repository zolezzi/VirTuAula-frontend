<template>
  <div
    :class="hide ? 'animate__animated animate__zoomOut animate__faster' : ''"
  >
    <b-container>
      <b-row>
        <b-col>
          <b-card img-alt="campaign" img-left class="mb-3">
            <div class="virtuaula-title">
              <h4 class="card-title">{{ campaign.name }}</h4>
              <template v-if="!deliveryDateExpired || campaign.state === 'COMPLETED'">
                <h4
                  v-show="
                    campaign.note != null &&
                    !this.$store.getters.getUser.isLeader()
                  "
                >
                  <b-badge class="virtuaula-mark" variant="warning"
                    >Mark: {{ campaign.note }}</b-badge
                  >
                </h4>
              </template>
              <template v-if="deliveryDateExpired && campaign.state === 'UNCOMPLETED'">
                <h4 v-show="!this.$store.getters.getUser.isLeader()">
                  <b-badge class="virtuaula-mark" variant="danger"
                    >Expired</b-badge
                  >
                </h4>
              </template>
              <template v-if="!deliveryDateExpired && campaign.state === 'PENDING'">
                <h4 v-show="!this.$store.getters.getUser.isLeader()">
                  <b-badge class="virtuaula-mark" variant="secondary"
                    >Pending</b-badge
                  >
                </h4>
              </template>
            </div>
            <b-card-text>
              Some quick example text to build on the card and make up the bulk
              of the card's content.
            </b-card-text>
            <b-container>
              <b-row>
                <b-col cols="7" sm="9" lg="10">
                  <b-progress
                    v-show="!this.$store.getters.getUser.isLeader()"
                    :max="max"
                    class="mt-2"
                  >
                    <b-progress-bar
                      :value="campaign.progress === 0 ? 100 : value"
                      :variant="campaign.progress === 0 ? 'secondary' : 'success'"
                      show-progress
                      :label="`${value}%`"
                    ></b-progress-bar>
                  </b-progress>
                </b-col>
                <b-col cols="2" v-show="this.$store.getters.getUser.isLeader() || !this.deliveryDateExpired">
                  <b-button href="#" variant="warning" @click="doCampaign()">{{
                    campaign.progress === 100 ||
                    this.$store.getters.getUser.isLeader() || campaign.state === 'PENDING'
                      ? "View"
                      : "Do"
                  }}</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      value: 0,
      max: 100,
      timer: null,
    };
  },
  props: ["campaign", "hide"],
  mounted() {
    this.timer = setInterval(() => {
      this.value = this.campaign.progress;
    }, 500);
  },
  computed: {
    deliveryDateExpired() {
      return moment().isAfter(moment(this.campaign.deliveryDate)) && this.campaign.progress < 100;
    },
  },
  methods: {
    doCampaign() {
      this.$store.commit("resetMissionResponse");
      this.$emit("update", true);
      this.$store.commit("addActualCampaign", this.campaign);
      setTimeout(() => this.$router.push({ name: "Campaign" }), 500);
    },
  },
};
</script>

<style scoped>
.btn-warning {
  width: 6rem;
}

.virtuaula-title {
  display: flex;
  justify-content: space-between;
}

.virtuaula-mark {
  color: white;
  width: 6rem;
}
</style>