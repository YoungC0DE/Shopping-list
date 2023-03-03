<template>
  <main
    class="d-flex flex-column justify-content-evenly align-items-center w-100 h-100"
  >
    <div class="">
      <HeaderComponent />
    </div>

    <div class="w-50 h-75">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="js">
import HeaderComponent from "@/components/Header.vue";

export default {
  components: { HeaderComponent },
};
</script>
