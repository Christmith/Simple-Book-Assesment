<template>
  <div id="app">
    <!-- The <router-view> is where the routed components will be injected -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Optional: Add global styles here */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
