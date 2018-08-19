<template>
  <div id="app">
    <app-landing-page v-if="$route.path !== '/print' && $route.path !== '/editSales' && $route.path !== '/editPurchase'"></app-landing-page>
    <!-- <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces,indent */
  import LandingPage from "./components/LandingPage";

  export default {
    name: "elevue",
    components: {
      appLandingPage: LandingPage,
    },
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
  overflow-y: auto;
  overflow-x: hidden;
  height: 360px;
  margin-bottom: 50px;
  padding-bottom: 50px;
}
</style>
