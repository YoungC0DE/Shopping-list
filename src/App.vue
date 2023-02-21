<template>
  <main
    class="d-flex flex-column justify-content-evenly align-items-center w-100 vh-100"
  >
    <div>
      <HeaderComponent />
    </div>
    <div class="d-flex flex-column align-items-center w-50 h-75">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
export default {
  components: { HeaderComponent }
};
</script>
