<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <form class="form-signin text-center needs-validation" novalidate>
    <img src="@/assets/images/logo.png" alt="logo" width="200" height="150" />
    <h1 class="h3 mb-3 fw-normal">Login</h1>
    <div class="alert alert-danger" role="alert" v-if="incorrect_login">
      Login ou senha estão incorretos.
    </div>
    <div class="alert alert-danger" role="alert" v-if="no_values">
      Preencha todos os campos.
    </div>
    <div class="form-floating">
      <input
        type="email"
        class="form-control shadow-none"
        v-model="data.email"
        id="floatingInput"
        placeholder="name@example.com"
        autocomplete="off"
        required
      />
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control shadow-none"
        v-model="data.password"
        id="floatingPassword"
        placeholder="Password"
        autocomplete="off"
        required
      />
      <label for="floatingPassword">Senha</label>
    </div>

    <div class="checkbox mb-2 mt-2">
      <label>
        <input type="checkbox" value="remember-me" /> Continuar logado
      </label>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary mb-3"
      type="submit"
      v-on:click.prevent="login()"
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
    };
  },
  methods: {
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
    login() {
      if(this.validate()) return;

      axios
        .post(import.meta.env.VITE_BASE_API + "/users/login", this.data)
        .then(({data}) => {
          // save my values on session
          sessionStorage.setItem("id_user", data.data[0].ID)
          sessionStorage.setItem("name_user", data.data[0].name)
          sessionStorage.setItem("email_user", data.data[0].email)
          sessionStorage.setItem("avatar_user", data.data[0].avatar)
          sessionStorage.setItem("level_user", data.data[0].level)
          // Go to Home Page
          this.$router.push("/home");
        })
        .catch((error) => {
          this.incorrect_login = true;
        });
    },
  },
};
</script>
