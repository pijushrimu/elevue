<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-tabs">
                    <a class="navbar-item is-tab" :class="{ 'is-active' : isActive('Party')}" @click="changeView('Party')">Party Master</a>
                  
                </div>
            </div>
        </nav>
        <app-party v-if="willShow === 'Party'"></app-party>
    </div>
</template>

<script>
import Party from "./Party/Party";

export default {
  name: "index",
  data() {
    return {
      willShow: "Party",
    };
  },
  components: {
    appParty: Party,

  },
  methods: {
    changeView(view) {
      this.willShow = view;
    },
    isActive(view) {
      if (this.willShow === view) {
        return true;
      }
    },
    test() {
      alert("Done!!", "Party Manager");
    },
  },
};
</script>

<style scoped>

</style>
