<template>
    <div class="custom-main-content">
        <div class="content-action">
          <button class="btn btn-ac" @click="nextComponent('question-list')">
            <i class="fa-solid fa-bars"></i>
            Question List
          </button>
        </div>
    </div> <!---custom-main-content-->
</template>

<script>
import {  mapActions, mapGetters } from 'vuex';

export default{
    name: 'QuestionList',
    computed:{
        ...mapGetters (['rightSidebarStatus', 'currentComponent'])
    },
    methods: {
        ...mapActions(['updateCurrentComponent', 'toggleRightSuggestionSidebar']),
        nextComponent(name){
            this.updateCurrentComponent(name);
            return;
        },
    },
}

</script>

<style>
    
</style>