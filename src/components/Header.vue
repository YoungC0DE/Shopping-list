<style>
.nav-masthead .nav-link {
  color: rgba(255, 255, 255, 0.5);
  border-bottom: 0.25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.nav-masthead .nav-link+.nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

header div nav {
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

header div nav div.dropdown {
  display: none;
}

@media (max-width: 600px) {
  header div nav .no-drop-item {
    display: none;
  }

  header div nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 0;
  }

  header div nav div.dropdown {
    display: flex;
  }
}

@media (max-width: 300px) {
  header div nav a.btn-danger {
    margin-top: 2px;
  }
}

@media (max-width: 600px) {
  header div h3 {
    margin-bottom: 30px;
  }

  header div h3 {
    font-size: 22pt;
  }

}
</style>

<template>
  <header>
    <div>
      <h3 class="float-md-start">ShoppingList</h3>
      <nav class="nav nav-masthead float-md-end">
        <router-link class="nav-link fw-bold text-secondary no-drop-item m-0" :class="current_page == 'Profile' ? 'active' : ''" aria-current="page" v-on:click="changeHeader('Profile')" to="Profile">
          {{ $t("header.profile") }}
        </router-link>
        <router-link class="nav-link fw-bold text-secondary no-drop-item m-0" :class="current_page == 'Dashboard' ? 'active' : ''" aria-current="page" v-on:click="changeHeader('Dashboard')" to="Dashboard">
          {{ $t("header.list") }}
        </router-link>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
           <span class="hide-me-for-responsive">Menu</span> <i class="bi bi-list"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <router-link class="fw-bold text-secondary m-0 dropdown-item" :class="current_page == 'Profile' ? 'active' : ''" aria-current="page" v-on:click="changeHeader('Profile')" to="Profile">
                {{ $t("header.profile") }} <i class="bi bi-person-circle"></i>
              </router-link>
            </li>
            <li>
              <router-link class="fw-bold text-secondary m-0 dropdown-item" :class="current_page == 'Dashboard' ? 'active' : ''" aria-current="page" v-on:click="changeHeader('Dashboard')" to="Dashboard">
                {{ $t("header.list") }} <i class="bi bi-bag-check-fill"></i>
              </router-link>
            </li>
          </ul>
        </div>
        <a class="nav-link fw-bold btn btn-danger text-white m-0 pt-1 pb-1" v-on:click="logout()">
          <span class="hide-me-for-responsive">{{ $t("header.btnExit") }}</span> 
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
