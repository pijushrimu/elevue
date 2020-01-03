<template>
  <div id="app">
    <app-landing-page
      v-if="$route.path !== '/print' && $route.path !== '/editSales' && $route.path !== '/editPurchase' && $route.path !== '/editStock'"
    ></app-landing-page>
    <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"> -->
    <div :class="classObject">
      <router-view></router-view>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces,indent */
import LandingPage from "./components/LandingPage";

export default {
  name: "elevue",
  components: {
    appLandingPage: LandingPage
  },
  computed: {
    classObject() {
      return {
        "app-content":
          this.$route.path !== "/print" &&
          this.$route.path !== "/editSales" &&
          this.$route.path !== "/editPurchase" &&
          this.$route.path !== "/editStock"
      };
    }
  }
};
</script>

<style>
/* CSS */
html,
body {
  height: 100%;
  overflow: hidden;
}

.scrollable {
  overflow-y: scroll;
  max-height: 400px;
  margin-bottom: 50px;
}

.app-content {
  margin-top: 85px;
}
</style>
