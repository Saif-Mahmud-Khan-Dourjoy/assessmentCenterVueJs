<template>
  <div class="container">
    <div class="sub-menu">
      <ul></ul>
    </div>
    <!---sub menu-->
    <div class="assessment-list" v-if="isVisible('all-assessment')">
      <all-assessment />
    </div>
    <!---assessment list-->
    <div class="assessment-create" v-else-if="isVisible('create-assessment')">
      <create-assessment />
    </div>
    <!---assessment create-->
    <div class="unknown" v-else>
      <div class="custom-main-content">
        <div class="content-action"></div>
      </div>
      <!---custom-main-content-->
    </div>
    <div
      class="body-footer"
      v-if="
        isVisible('create-assessment') &&
        $store.state.assessment.continue > 0 &&
        $store.state.assessment.continue < 3
      "
    >
      <!-- <div class="footer-input">
        <input class="form-control text-input" type="text" />
      </div> -->
      <div class="footer-div" v-if="$store.state.assessment.continue == 1">
        <p class="footer-div-text">Selected No of Set</p>
        <p class="footer-div-text">2</p>
      </div>
      <div class="footer-div" v-if="$store.state.assessment.continue == 2">
        <p class="footer-div-text">Selected No of Question</p>
        <p class="footer-div-text">10</p>
      </div>
      <div class="footer-button">
        <button class="btn btn-ac" @click="con_button_click">Continue</button>
      </div>
    </div>
    <!--- Unknown component-->
  </div>
  <!---container-->

  <!---container-->
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AllAssessment from "./AllAssessments.vue";
import CreateAssessment from "./CreateAssessment.vue";

export default {
  name: "QustionBank",
  components: {
    AllAssessment,
    CreateAssessment,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["rightSidebarStatus", "showAssessmentComponent"]),
  },
  methods: {
    ...mapMutations(["undateContinueCount"]),
    ...mapActions(["updateCurrentComponent", "toggleRightSuggestionSidebar"]),
    toggleRightSidebar() {
      this.toggleRightSuggestionSidebar();
      return;
    },
    isVisible(componentName) {
      //   return componentName == this.$store.getters.showAssessmentComponent;
      return componentName == this.showAssessmentComponent;
    },
    nextComponent(name) {
      this.updateCurrentComponent(name);
      return;
    },
    con_button_click() {
      this.undateContinueCount();
      return;
    },
  },
};
</script>
<style>
.content-action {
  margin: 0px;
}
.custom-main-content {
  min-height: 80vh;
  /* min-height: 100%; */
  background: #f6f7fb;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 20px 38px;
}
.container {
  margin: 0;
  padding: 0;
  max-width: 100%;
  /* background-color:blue; */
  /* height: auto; */
}
.assessment-list {
  display: flex;
}
.assessment-create {
  display: flex;
}

.action-right-sidebar {
  padding: 100px 0 0 0;
}
.body-footer {
  height: 100px;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  box-shadow: 0px -1px 20px #e7e7e7;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-main-container {
  padding-bottom: 0rem;
  /* padding-right: 0rem; */
}
/* .footer-input {
  width: 20%;
}
.text-input {
  width: 100%;
  border-radius: 0px;
  box-shadow: none !important;
  border: 0.145rem solid #ced4da;
} */
.footer-div {
  border: 0.145rem solid #ced4da;
  width: 20%;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 19px 10px 19px;
}
.footer-div-text {
  font-size: 14px;
  font-weight: 400;
  margin: 0;
}

.footer-button {
  margin-left: 20px;
}
.continue-button {
  background-color: #045692;
  border-radius: 0px;
  padding-left: 30px;
  padding-right: 30px;
  color: white;
}
</style>