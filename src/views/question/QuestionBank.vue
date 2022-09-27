<template>
  <div class="container">
    <div class="sub-menu">
      <ul>
        <li @click="nextComponent('question-list')">
          Questions
        </li>
        <li @click="nextComponent('question-set')">
          Question Set
        </li>
      </ul>
    </div><!---sub menu-->
    <div class="question-list" v-if="isVisible('question-list')">
      <QuestionList />
    </div><!---question list-->
    <div class="question-create" v-else-if="isVisible('question-create')" style="display:flex;">
      <CreateQuestionVue/>
    </div><!---question create-->
    <div class="question-set" v-else-if="isVisible('question-set')">
      <QuestionSet />
    </div><!---question set-->
    <div class="unknown" v-else>
      <div class="custom-main-content">
        <div class="content-action">
        </div>
      </div> <!---custom-main-content-->
    </div><!--- Unknown component-->
  </div><!---container-->
</template>
<script>

import QuestionList from './QuestionList.vue';
import QuestionSet from './QuestionSet.vue';
import CreateQuestionVue from './CreateQuestion.vue';
import {  mapActions, mapGetters } from 'vuex';

export default {
  name: "QustionBank",
  components:{
    QuestionList,
    QuestionSet,
    CreateQuestionVue,
  },
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters (['rightSidebarStatus', 'currentComponent'])
  },
  methods: {
    ...mapActions(['updateCurrentComponent', 'toggleRightSuggestionSidebar'])
    ,
    toggleRightSidebar(){
      this.toggleRightSuggestionSidebar();
      return;
    },
    isVisible(componentName){
      return componentName == this.currentComponent;
    },
    nextComponent(name){
      this.updateCurrentComponent(name);
      return;
    },
  },
};
</script>
<style>

.content-action{
  margin:0px;
}
  .custom-main-content{
    min-height: 80vh;
    /* min-height: 100%; */
    background: #F6F7FB;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    width: 100%;
    padding: 20px 38px;
  }
  .container{
    margin: 0;
    padding: 0;
    max-width: 100%;
    /* background-color:blue; */
    /* height: auto; */
  }
  .sub-menu{
    color: #0000;
    height:2rem;
  }
  .sub-menu ul{
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .sub-menu li{
    padding: 0;
    margin: 0 52px 0 0;
    cursor: pointer;
    font-size: 15px;
    font-weight: 400px;
    color: #828282;
  }
  .sub-menu li:hover{
    font-size: 16px;
    font-weight: 400px;
    color: #696767e3;
  }
  /* .btn-ac{
  background: #045692;
  width: 152px;
  height: 40px;
  border-radius: 0;
  color: #FFFFFF;
  font-size: 14px;
}
.btn-ac:hover{
  background: #045692;
  width: 152px;
  height: 40px;
  font-size: 14.5px;
  border-radius: 0;
  color: #FFFFFF;
} */
.action-right-sidebar{
  padding: 100px 0 0 0;
}
</style>