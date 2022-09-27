<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="./assets/images/nslLogo.svg" />
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
      id="ac-menu-button"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <div id="menu-div-flex">
      <ul>
        <li v-for="list in model" :key="list">
          <router-link :to="list.to" @click="menu(list.label)"
            >{{ list.label }}
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["model"],
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    menu(value) {
      if (value == "Assessment") {
        this.$store.state.assessment.question_set = [];
        if (this.$store.state.assessment.continue > 0) {
          this.$store.state.assessment.continue = 0;
        }
      }
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>


<style>
#ac-menu-button {
  display: none;
}
#menu-div-flex {
  width: 100%;
  margin: 10px 0 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
}
#menu-div-flex ul {
  display: flex;
  justify-content: center;
}
#menu-div-flex ul li {
  font-size: 16px;
  color: #e0e0e0;
  list-style-type: none;
  margin: 0 16px;
}
#menu-div-flex a {
  font-size: 16px;
  list-style-type: none;
  font-family: "Open Sans" !important;
  font-weight: normal !important;
  font-size: 16px;
  line-height: 22px;
  color: #e0e0e0;
}
#brand-text {
  font-size: 20px;
}
@media (max-width: 991px) {
  #ac-menu-button {
    display: block;
  }
  #menu-div-flex {
    display: none;
  }
}
.layout-topbar {
  background: linear-gradient(90deg, #284064 0%, #157866 110.38%);
}
</style>