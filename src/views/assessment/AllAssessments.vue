<template>
  <div class="custom-main-content">
    <div class="content-action">
      <button
        class="btn btn-ac btn-as-cr"
        @click="nextComponent('create-assessment')"
      >
        <i class="fa-solid fa-plus"></i>
        Create Assessment
      </button>
    </div>
    <div style="display: flex; justify-content: center">
      <div class="main-content"></div>
      <!--main-content-->
    </div>
    <!-- question create property-->
  </div>
  <!---custom-main-content-->
  <div class="">
    <div
      class="rhombus"
      :class="{ bgWhite: !rightSidebarStatus }"
      @click="toggleRightSidebar()"
    >
      <i
        class="fa fa-chevron-left"
        :class="{ hide: rightSidebarStatus }"
        aria-hidden="true"
      ></i>
      <i
        class="fa fa-chevron-right"
        :class="{ hide: !rightSidebarStatus }"
        aria-hidden="true"
      ></i>
    </div>
  </div>
  <!---arrow box-->
  <div class="right-sidebar" :class="{ hide: !rightSidebarStatus }">
    <h4>Useful Tips</h4>
    <p>You can create Both multiple & true false question.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4>Related Tasks</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4>Import Questions</h4>
    <p>Lorem ipsum dolar</p>
  </div>
  <!---right sidebar-->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["rightSidebarStatus", "currentComponent"]),
  },
  methods: {
    ...mapActions([
      "updateCurrentAssessmentComponent",
      "toggleRightSuggestionSidebar",
    ]),
    toggleRightSidebar() {
      this.toggleRightSuggestionSidebar();
      return;
    },
    isVisible(componentName) {
      return componentName == this.currentComponent;
    },
    nextComponent(name) {
      this.updateCurrentAssessmentComponent(name);
      return;
    },
  },
};
</script>
<style scoped>
.btn-as-cr {
  width: 180px;
}
.rhombus {
  position: absolute;
  width: 42px;
  height: 44px;
  border-radius: 50%;
  font-size: 16px;
  background-color: #f6f7fb;
  /* color:#f1f1f2; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* top:calc(100px - 22px); */
  margin-top: 100px;
  /* left:calc(100% - 22px); */
  margin-left: -30px;
  z-index: 3;
  cursor: pointer;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.fa-chevron-left {
  padding-right: 21px;
}
.fa-chevron-right {
  margin-left: 24px;
}
.hide {
  display: none;
}

.right-arrow {
  margin-top: 88px;
}

.right-sidebar {
  width: 20%;
  background-color: #ffffff;
  height: 100%;
  margin-left: 16px;
  padding: 0 16px 16px 16px;
}
.right-sidebar h4 {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #0d9344;
}
.right-sidebar p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #4f4f4f;
}
</style>

