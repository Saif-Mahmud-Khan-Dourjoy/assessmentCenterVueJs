<template>
  <div class="custom-main-content">
    <div class="content-action">
      <button
        class="btn btn-ac btn-as-cr"
        @click="nextComponent('all-assessment')"
      >
        <i class="fa-solid fa-bars"></i>
        Assessment List
      </button>
    </div>
    <div style="display: flex; justify-content: center">
      <div class="main-content">
        <div class="progress-bar-selection-div">
          <div
            class="multi-tag-select-div"
            v-if="$store.state.assessment.continue < 2"
          >
            <div class="multi-tag-select">
              <MultipleSelect
                class="multi-select-option"
                v-model="selected_tag"
                :options="category_name"
                placeholder="Select Tags"
                filter="true"
                display="chip"
                style="box-shadow: none"
              />
            </div>
            <div class="institute-select">
              <select class="form-select institute">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>

        <div
          class="question-set-div changeable-div"
          v-if="$store.state.assessment.continue < 2"
        >
          <div class="card" v-for="(option, index) in 3" :key="index">
            <div class="card-body">
              <div class="card-input-div">
                <div class="card-input">
                  <input
                    type="checkbox"
                    :value="index"
                    v-model="question_set"
                  />
                </div>
                <div class="card-star-option-div">
                  <div class="star">
                    <i class="fa-regular fa-star" style="color: yellow"></i>
                  </div>
                  <div class="option">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
              <h5 class="card-title set-title">Set 111</h5>
              <p class="set-tags">CSE, C++, Python, more(3)</p>
              <p class="set-question-no">No Of Questions - 20</p>
            </div>
            <div class="card-footer-div"></div>
          </div>
        </div>
        <!-- {{ $store.state.assessment.question_set }} -->
        <!-- sample -->
        <div
          class="questions-from-set"
          v-if="$store.state.assessment.continue == 2"
        >
          <div class="input-div">
            <div class="checkbox-input">
              <input type="checkbox" />
            </div>
            <div class="new-question-div">
              <p>Want to add a new question? <span>Click here</span></p>
            </div>
          </div>
          <div class="questions-cards">
            <div
              class="questions-row"
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <div class="card question-card" v-for="index in 5" :key="index">
                <div class="card-header question-card-header">
                  <input
                    type="checkbox"
                    class="form-check-input question-select-checkbox"
                  />
                </div>
                <div class="card-body question-card-body">
                  <div class="card-title question-card-tag">
                    <p>C++, Python, Java</p>
                  </div>
                  <div
                    class="question-description-option"
                    style="padding: 6px 12px; overflow-x: hidden"
                  >
                    <div class="question-description" style="display: flex">
                      <div style="font-weight: bold; margin-right: 8px">Q.</div>
                      <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sit id mollis donec placerat. consectetur adipiscing
                        elit. Sit id mollis
                      </div>
                    </div>
                    <br />
                    <div class="question-option">
                      <div
                        class="option-content"
                        v-for="(option, index) in 4"
                        :key="index"
                        style="display: flex"
                      >
                        <div style="font-weight: bold; margin-right: 8px">
                          {{ String.fromCharCode(65 + index) }}.
                        </div>
                        <div>Lorem Ipsum</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!---question-cards-->
          </div>
        </div>

        <div
          class="question-set-div changeable-div"
          v-if="$store.state.assessment.continue == 3"
        >
          <div class="card" v-for="index in 5" :key="index">
            <div class="card-body">
              <div class="card-input-div">
                <div class="card-input">
                  <input type="checkbox" />
                </div>
                <div class="card-star-option-div">
                  <div class="star">
                    <i class="fa-regular fa-star" style="color: yellow"></i>
                  </div>
                  <div class="option">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
              <h5 class="card-title set-title">Set 111</h5>
              <p class="set-tags">CSE, C++, Python, more(3)</p>
              <p class="set-question-no">No Of Questions - 20</p>
            </div>
            <div class="card-footer-div"></div>
          </div>
        </div>
      </div>

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

  <!-- <div class="body-footer">
    <div class="footer-input">
      <input class="form-control" type="text" />
    </div>
    <div class="footer-button">
      <button class="btn continue-button">Continue</button>
    </div>
  </div> -->

  <!---right sidebar-->
</template>
<script>
import MultipleSelect from "primevue/multiselect";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    MultipleSelect,
  },

  computed: {
    ...mapGetters(["rightSidebarStatus", "currentComponent"]),
    question_set: {
      get() {
        return this.$store.state.assessment.question_set;
      },
      set(newValue) {
        this.$store.state.assessment.question_set = newValue;
      },
    },
  },
  watch: {
    question_set() {
      if (this.$store.state.assessment.question_set.length > 0)
        this.$store.state.assessment.continue = 1;
    },
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

/* assessment creation part */
.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.progress-bar-selection-div {
  margin: 0 auto;
  width: 50%;
}
.multi-tag-select-div {
  display: flex;
  justify-content: space-around;
  padding: 0px 15px 0px 15px;
}
.multi-tag-select {
  width: 45%;
}
.institute-select {
  width: 45%;
}
.institute {
  height: 43px;
}
.form-select {
  border-radius: 0rem !important;
  box-shadow: none;
}
.multi-select-option {
  height: 43px;
  align-items: center;
}

.question-set-div {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* flex-grow: 1; */
}

.card {
  border-radius: 0px !important;
  width: 32%;
  /* margin-right: 15px; */
}
.card-input-div {
  display: flex;
  justify-content: space-between;
}
.card-star-option-div {
  display: flex;
  justify-content: space-between;
  width: 8%;
}
.set-title {
  font-weight: 600;
  font-size: 16px;
}
.set-tags {
  margin-top: 15px;
  font-weight: 400;
  font-size: 14px;
}
.set-question-no {
  font-weight: 600;
  font-size: 14px;
}
.card-footer-div {
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
}

/* question_card */
.questions-from-set {
  margin-top: 40px;
}
.question-card {
  width: 32%;
  height: 290px;
  margin: 0.5rem 0.5rem;
  border-radius: 0px;
}
.question-description-option {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  height: 190px;
}
.question-description-option::-webkit-scrollbar {
  width: 5px;
  height: 24px;
}

/* Track */
.question-description-option::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #e0e0e0;
  border-radius: 10px;
}

/* Handle */
.question-description-option::-webkit-scrollbar-thumb {
  background: #1381e7;
  border-radius: 0px;
}

/* Handle on hover */
.question-description-option::-webkit-scrollbar-thumb:hover {
  background: #1381e7;
}
.question-card-body {
  padding: 0px;
}
.question-card-tag {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  margin: 8px 0px;
  height: 33px;
  display: flex;
  align-items: center;
  padding: 0px 6px;
}
.question-content {
  padding: 8px 0px;
}
.question-card-header {
  background: #fff;
  margin: 0px;
  padding: 0px;
  border-bottom: none;
  border-radius: none !important;
  /* height: 33px; */
}
.card {
  padding: 9px 17px;
}

.checkbox-input {
  padding-left: 8px;
}
.new-question-div {
  width: 100%;
  text-align: center;
}
.new-question-div p {
  margin: 0 auto;
  /* position: relative; */
  margin-top: -23px;
}

.new-question-div p > span {
  color: #1381e7;
}
</style>