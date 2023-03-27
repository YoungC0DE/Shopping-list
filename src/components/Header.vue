<style>
.nav-masthead .nav-link {
  color: rgba(255, 255, 255, 0.5);
  border-bottom: 0.25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
</style>

<template>
  <header class="p-5 pt-3 pb-0">
    <div>
      <h3 class="float-md-start mb-0">ShoppingList</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <router-link
          class="nav-link fw-bold text-secondary"
          :class="current_page == item.name ? 'active' : ''"
          aria-current="page"
          v-on:click="changeHeader(item.name)"
          :to="item.name"
          v-for="(item, index) in menu_itens"
          :key="index"
        >
          {{ item.label }}
        </router-link>
        <a class="nav-link fw-bold btn btn-danger text-white" v-on:click="logout()">
          Logout
          <i class="bi bi-box-arrow-right"></i>
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
import "vue-router";

export default {
  data() {
    return {
      menu_itens: [
        { label: "Profile", name: "Profile" },
        { label: "My list", name: "Dashboard" },
      ],
      current_page: this.$route.name,
    };
  },
  methods: {
    changeHeader(value) {
      this.current_page = value;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
