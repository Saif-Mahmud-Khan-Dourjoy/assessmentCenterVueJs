export default {
    state: {
        currentComponent: "all-assessment",
        continue: 0,
        question_set: [],
    },
    mutations: {
        updateCurrentAssessmentComponent(state, payload) {
            state.currentComponent = payload.name
        },
        undateContinueCount(state) {
            state.continue++;
        },
    },
    actions: {
        updateCurrentAssessmentComponent(context, payload) {
            context.commit({ type: "updateCurrentAssessmentComponent", name: payload })
        }
    },
    getters: {
        showAssessmentComponent(state) {
            return state.currentComponent
        }
    }
}