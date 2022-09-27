/***
 * 
 * Reference: 
 * 
 */
import axios from "axios";
import CONFIG from "../../config";



const state = {
    questions: []

};


const getters = {
    allQuestions: state => state.questions,
    questionDetails: (state) => (id) => {  /** This getter method will return specific question available on allQuestion state */
        console.log(state.questions.find(question => question.id === id));
        return state.questions.find(question => question.id === id);
    }
};

const actions = {
    async fetchQuestions({ commit }) {
        var data = new FormData();
        console.log(CONFIG.baseApi);
        var config = {
            method: 'get',
            url: CONFIG.baseApi + 'questions/',
            headers: {
                'Accept': 'application/json',
                'Authorization': CONFIG.token,
                //   ...data.getHeaders()
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data.questions));
                commit('setQuestions', response.data.questions);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

};

const mutations = {
    setQuestions: (state, questions) => (state.questions = questions),

};

export default {
    state,
    getters,
    actions,
    mutations
}