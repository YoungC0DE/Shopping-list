<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <main
    class="form-signin d-flex flex-row justify-content-center align-items-center w-100 vh-100"
  >
    <form class="text-center">
      <img src="@/assets/images/logo.png" alt="logo" width="200" height="150" />
      <h1 class="h3 mb-3 fw-normal">Login</h1>
      <div class="alert alert-danger" role="alert" v-if="incorrectLogin">
        Seu login ou senha estão incorretos!
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-control shadow-none"
          v-model="data.email"
          id="floatingInput"
          placeholder="name@example.com"
          autocomplete="off"
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
        >Criar conta</router-link
      >
      <p class="mt-4 text-muted">&copy; youngcode.ltda</p>
    </form>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {
        email: null,
        password: null,
      },
      incorrectLogin: false
    };
  },
  methods: {
    login() {
      axios
        .post(import.meta.env.VITE_BASE_API + "/login", this.data)
        .then((resp) => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.incorrectLogin = true;
        });
    },
  },
};
</script>
