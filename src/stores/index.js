import { createStore } from "vuex";
import question from "./modules/question.js";
import questionBank from './modules/questionBank';
import assessment from "./modules/assessment.js";


const store = createStore({
    modules: {
        questionBank,
        question,
        assessment
    }
})

export default store;