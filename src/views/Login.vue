<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <form class="form-signin text-center needs-validation" novalidate>
    <img src="@/assets/images/logo.png" alt="logo" width="200" height="150" />
    <h1 class="h3 mb-3 fw-normal">Login</h1>
    <div class="alert alert-danger" role="alert" v-if="incorrect_login">
      Incorrect Email or password.
    </div>
    <div class="alert alert-danger" role="alert" v-if="no_values">
      Fill in all fields.
    </div>
    <div class="form-floating">
      <input
        type="email"
        class="form-control shadow-none"
        v-model="data.email"
        id="email"
        placeholder="name@example.com"
        autocomplete="off"
        required
      />
      <label for="email">Email</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control shadow-none"
        v-model="data.password"
        id="password"
        placeholder="Password"
        autocomplete="off"
        required
      />
      <label for="password">Senha</label>
    </div>

    <div class="checkbox mb-2 mt-2">
      <label>
        <input type="checkbox" value="remember-me" v-model="keepLogged" />
        Continuar logado
      </label>
    </div>

    <button
      class="w-100 btn btn-lg btn-primary mb-3"
      type="submit"
      v-on:click.prevent="login"
    >
      Logar
    </button>
    <router-link
      to="/register"
      class="text-decoration-none btn btn-outline-secondary w-100"
    >
      Criar conta
    </router-link>
    <p class="mt-4 text-muted">&copy; youngcode.ltda</p>
  </form>
</template>

<script>
import axios from "axios";
import HeaderComponent from "@/components/Header.vue";
import { useUserStore } from "@/stores/user";

export default {
  components: { HeaderComponent },
  data() {
    return {
      data: {
        email: null,
        password: null,
      },
      incorrect_login: false,
      no_values: false,
      keepLogged: false,
    };
  },
  setup() {
    const store = useUserStore();

    return {
      store,
    };
  },
  methods: {
    setData(data) {
      this.store.$state = {
        user_id: data.data[0].ID,
        name: data.data[0].name,
        email: data.data[0].email,
        avatar: data.data[0].avatar,
        level: data.data[0].level,
      };

      sessionStorage.setItem("piniaState", btoa(JSON.stringify({
        user_id: data.data[0].ID,
        name: data.data[0].name,
        email: data.data[0].email,
        avatar: data.data[0].avatar,
        level: data.data[0].level,
      })));
    },
    validate() {
      this.incorrect_login = false;
      this.no_values = false;

      var forms = document.querySelectorAll(".needs-validation");
      forms.forEach((form) => form.classList.add("was-validated"));

      if (!this.data.email || !this.data.password) {
        this.no_values = true;
        return true;
      }
    },
    wantKeepLogged() {
      let criptedData = localStorage.getItem("kpl6ud");
      if (!criptedData) return false;

      let data = JSON.parse(atob(criptedData));
      this.data = {
        email: data.email,
        password: data.password,
      };

      this.login();
    },
    login() {
      if (this.validate()) return;
      let urlData = `email=${this.data.email}&password=${this.data.password}`;

      axios
        .post(import.meta.env.VITE_BASE_API + "/users/login?" + urlData)
        .then(({ data }) => {
          // save my values on store
          this.setData(data);
          // Go to Home Page
          if (this.keepLogged) {
            localStorage.setItem("kpl6ud", btoa(JSON.stringify(this.data)));
          }
          this.$router.push({ name: "Dashboard" });
        })
        .catch(() => {
          this.incorrect_login = true;
        });
    },

  },
  mounted() {
    this.wantKeepLogged();
  },
};
</script>
