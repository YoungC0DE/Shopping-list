<style>
@import "@/assets/App.css";
</style>

<template>
  <main class="main-body d-flex flex-column justify-content-center align-items-center vh-100 text-center text-bg-dark text-body bg-body">
    <ThemeButton />
    <LanguageButton />
    <router-view></router-view>
  </main>
</template>

<script>
import ThemeButton from "@/components/ThemeButton.vue";
import LanguageButton from "./components/languageButton.vue";

export default {
  components: { ThemeButton, LanguageButton },
};
</script>
