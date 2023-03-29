<template>
  <div
    class="cover-container d-flex flex-column justify-content-between w-100 vh-100 p-3"
    style="max-width: 60%"
  >
    <HeaderComponent />

    <router-view></router-view>

    <footer class="text-body">
      <p>&copy; 2023 youngcode.ltda</p>
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  components: { HeaderComponent },
};
</script>
