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
  </ul>
</template>

<script>
import "vue-router";

export default {
  data() {
    return {
      menu_itens: [
        { label: "Perfil", name: "Profile" },
        { label: "Minha lista", name: "Dashboard" },
        { label: "Novo Item", name: "NewItem" },
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
  },
};
</script>
