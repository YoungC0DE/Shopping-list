<style scoped>
@import "@/assets/Home.css";
</style>

<template>
  <main
    class="d-flex flex-column justify-content-evenly align-items-center w-100 vh-100"
  >
    <div class="">
      <HeaderComponent />
    </div>

    <div class="responsive-view">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  components: { HeaderComponent },
};
</script>
