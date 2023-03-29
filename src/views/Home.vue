<style scoped>
.cover-container {
  max-width: 60%;
}

@media (max-width: 600px) {
  .cover-container {
    max-width: 100%;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    gap: 20px !important;
  }

  footer {
    display: none;
  }
}
</style>

<template>
  <div
    class="cover-container d-flex flex-column justify-content-between w-100 vh-100 p-3"
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
