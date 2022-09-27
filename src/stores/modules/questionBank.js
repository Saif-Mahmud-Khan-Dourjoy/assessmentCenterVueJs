

const state = {
    rightSuggestionSidebar: false ,
    questionBankComponent:'question-list'

};


const getters = {
    rightSidebarStatus: state => state.rightSuggestionSidebar,
    currentComponent: state => state.questionBankComponent,

};

const actions = {
    updateCurrentComponent({ commit }, component_name){
        commit('setCurrentComponent', component_name);
        // Any how for the question-create component the suggestion sidebar must be opened
        if (component_name=='question-create' && state.rightSuggestionSidebar==false) {
            commit('setRightSuggestionSidebar');
        }
    },
    toggleRightSuggestionSidebar({ commit }){
        commit('setRightSuggestionSidebar');
    }
    

};

const mutations = {
    setCurrentComponent(state, component_name){
        state.questionBankComponent = component_name;
    },
    setRightSuggestionSidebar(state){
        state.rightSuggestionSidebar = !state.rightSuggestionSidebar;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}