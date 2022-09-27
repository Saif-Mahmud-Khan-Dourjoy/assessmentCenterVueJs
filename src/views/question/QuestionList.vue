<template>
  <div class="custom-main-content">
    <div class="content-action" style="display: flex">
      <div>
        <button class="btn btn-ac" @click="nextComponent('question-create')">
          <i class="fa-solid fa-plus"></i>
          Create Question
        </button>
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%">
        <div
          style="
            display: flex;
            justify-content: flex-start;
            width: 50%;
            margin: 0 0 0 54px;
          "
        >
          <div style="width: 50%">
            <MultiSelect
              v-model="selectedCars"
              :options="cars"
              optionLabel="brand"
              placeholder="Select Brands"
              filter="true"
              display="chip"
            />
          </div>
          <div style="margin: 0 0 0 22px; width: 50%">
            <MultiSelect
              v-model="selectedCars"
              :options="cars"
              optionLabel="brand"
              placeholder="Select Brands"
              filter="true"
              display="chip"
            />
          </div>
        </div>
        <div>
          <input type="text" class="form-control" />
        </div>
      </div>
    </div>
    <div class="question-content">
      <div style="margin: 0 20px" v-if="allQuestions.length > 0">
        <input
          type="checkbox"
          class="form-check-input"
          name="questionSetInstruction"
          style="margin-right: 20px; border-radius: 0px"
        />
        <label class="form-check-label" for="questionSetInstruction"
          >(Select checkbox to create Question Set)</label
        >
      </div>
      <!---question-content-->
      <div class="questions-cards" v-if="allQuestions.length > 0">
        <div
          class="questions-row"
          style="display: flex; flex-wrap: wrap; justify-content: space-between"
        >
          <div
            class="card question-card"
            v-for="question in allQuestions"
            :key="question.id"
          >
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
                  <div v-html="question['description']"></div>
                </div>
                <br />
                <div class="question-option">
                  <div
                    class="option-content"
                    v-for="(option, index) in question['question_details']"
                    :key="option.id"
                    style="display: flex"
                  >
                    <div style="font-weight: bold; margin-right: 8px">
                      {{ String.fromCharCode(65 + index) }}.
                    </div>
                    <div v-html="option.option"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!---question-cards-->
      </div>
      <!---question-cards-->
      <div class="question-cards" v-else>
        <div
          style="
            display: flex;
            height: 60vh;
            align-items: center;
            justify-content: center;
          "
        >
          <div style="display: flex; flex-direction: column">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img src="../../assets/images/empty.svg" alt="" />
            </div>
            <div>
              <p>
                No question available.
                <span
                  @click="nextComponent('question-create')"
                  style="color: #1381e7; cursor: pointer"
                  >Create</span
                >
                your first question.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Question Card-->
    </div>
    <!---Question List Own content-->
  </div>
  <!---custom-main-content-->
</template>

<script>
import MultiSelect from "primevue/multiselect";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "QuestionList",
  data() {
    return {
      cars: [
        { brand: "Audi", value: "Audi" },
        { brand: "BMW", value: "BMW" },
        { brand: "Fiat", value: "Fiat" },
        { brand: "Honda", value: "Honda" },
        { brand: "Jaguar", value: "Jaguar" },
        { brand: "Mercedes", value: "Mercedes" },
        { brand: "Renault", value: "Renault" },
        { brand: "Volkswagen", value: "Volkswagen" },
        { brand: "Volvo", value: "Volvo" },
        { brand: "Python", value: "Python" },
        { brand: "C++", value: "C++" },
        { brand: "Java", value: "Java" },
        { brand: "JavaScript", value: "JavaScript" },
        { brand: "Php", value: "Php" },
        { brand: "English", value: "English" },
      ],
      selectedCars: [],
      questions: [],
    };
  },
  components: {
    MultiSelect,
  },
  computed: {
    ...mapGetters([
      "rightSidebarStatus",
      "currentComponent",
      "allQuestions",
      "questionDetails",
    ]),
  },
  methods: {
    ...mapActions([
      "updateCurrentComponent",
      "toggleRightSuggestionSidebar",
      "fetchQuestions",
    ]),
    nextComponent(name) {
      this.updateCurrentComponent(name);
      return;
    },
  },
  created() {
    // this.questions = useQuestionStore.getters.getQuestions;
    this.fetchQuestions();
  },
};
</script>

<style scoped>
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

input {
  border-radius: 0px !important;
}
</style>