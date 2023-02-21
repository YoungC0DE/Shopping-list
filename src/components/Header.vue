<template>
  <ul
    class="nav nav-pills nav-fill gap-2 p-1 small rounded-5 shadow-sm border border-1"
    id="pillNav2"
    role="tablist"
    style="
      --bs-nav-link-color: var(--bs-secondary);
      --bs-nav-pills-link-active-color: var(--bs-secondary);
      --bs-nav-pills-link-active-bg: var(--bs-light);
    "
  >
    <li
      class="nav-item"
      role="presentation"
      v-for="(item, index) in menu_itens"
      :key="index"
    >
      <router-link
        :to="item.url"
        class="nav-link rounded-5"
        data-bs-toggle="tab"
        type="button"
        role="tab"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import "vue-router";

export default {
  data() {
    return {
      menu_itens: [
        { name: "Perfil", url: "/profile" },
        { name: "Minha lista", url: "/dashboard" },
        { name: "Contact", url: "/contact" },
      ],
      selected_page: null,
      current_page: null,
    };
  },
};
</script>
