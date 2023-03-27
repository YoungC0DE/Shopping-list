<style>
@import "@/assets/App.css";
</style>

<template>
  <main class="main-body d-flex flex-column justify-content-center align-items-center vh-100 text-center text-bg-dark text-body bg-body">
    <ThemeButton />
    <router-view></router-view>
  </main>
</template>

<script>
import ThemeButton from "@/components/ThemeButton.vue";

export default {
  components: { ThemeButton },
};
</script>
