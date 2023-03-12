<template>
  <ul
    class="nav nav-pills nav-fill gap-2 p-1 small rounded-5 shadow-sm border border-1"
    id="pillNav2"
    role="tablist"
    style="
      --bs-nav-link-color: var(--bs-secondary);
      --bs-nav-pills-link-active-color: var(--bs-white);
      --bs-nav-pills-link-active-bg: var(--bs-secondary);
    "
  >
    <li
      class="nav-item"
      role="presentation"
      v-for="(item, index) in menu_itens"
      :key="index"
      v-on:click="changeRoute(item.name)"
    >
      <span
        class="nav-link rounded-5 cursor-pointer"
        role="button"
        :class="item.name == current_page ? ' active' : ''"
      >
        {{ item.label }}
      </span>
    </li>
    <button type="button" class="btn btn-danger rounded-5" v-on:click="exit()">
      Exit
      <i class="bi bi-box-arrow-right"></i>
    </button>
  </ul>
</template>

<script>
import "vue-router";

export default {
  data() {
    return {
      menu_itens: [
        { label: "Profile", name: "Profile" },
        { label: "My list", name: "Dashboard" },
        { label: "Contact", name: "Contact" },
      ],
      current_page: this.$route.name,
    };
  },
  methods: {
    changeRoute(value) {
      this.$router.push({ name: value });
      this.current_page = value;
    },
    exit() {
      sessionStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
