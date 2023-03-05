<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <form class="form-signin text-center needs-validation" novalidate>
    <img src="@/assets/images/logo.png" alt="logo" width="200" height="150" />
    <h1 class="h3 mb-3 fw-normal">Registrar conta</h1>
    <div class="alert alert-danger" role="alert" v-if="no_values">
      Preencha todos os campos.
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control shadow-none rounded-top rounded-bottom-0 border-bottom-0"
        v-model="data.name"
        id="name"
        autocomplete="off"
        required
      />
      <label for="name">Nome completo</label>
    </div>
    <div class="form-floating">
      <input
        type="email"
        class="form-control shadow-none rounded-0"
        v-model="data.email"
        id="email"
        autocomplete="off"
        required
      />
      <label for="email">Email</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control shadow-none m-0 rounded-0"
        v-model="data.password"
        id="password"
        autocomplete="off"
        required
      />
      <label for="password">Senha</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control shadow-none border-top-0"
        v-model="password_confirm"
        id="password_confirm"
        autocomplete="off"
        required
      />
      <label for="password_confirm">Condfirme a Senha</label>
    </div>
    <div class="alert alert-warning" role="alert" v-show="password_not_match">
      As senhas não coincidem!
    </div>
    <button
      class="w-100 btn btn-lg btn-primary mb-3"
      type="submit"
      v-on:click.prevent="register()"
    >
      Criar conta
    </button>
    <router-link
      to="/"
      class="text-decoration-none btn btn-outline-secondary w-100"
    >
      Login
    </router-link>
    <p class="mt-4 text-muted">&copy; youngcode.ltda</p>
  </form>
</template>

<script>
import axios from "axios";
import HeaderComponent from "@/components/Header.vue";
import Swal from "sweetalert2";

export default {
  components: { HeaderComponent },
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
      },
      password_confirm: "",
      password_not_match: false,
      no_values: false,
    };
  },
  methods: {
    validate() {
      var forms = document.querySelectorAll(".needs-validation");
      forms.forEach((form) => form.classList.add("was-validated"));

      if (!this.data.email || !this.data.password) {
        if (this.password_confirm != this.data.password) {
          this.password_not_match = true;
        }
        this.no_values = true;
        return true;
      }
    },
    register() {
      if (this.validate()) return;

      axios
        .post(import.meta.env.VITE_BASE_API + "/users/register", this.data)
        .then((resp) => {
            console.log(resp)
          // Go to Home Page
          Swal.fire({
            icon: "success",
            title: "Conta criada",
            text: "Conta criada com sucesso. Faça o login para prosseguir.",
            showConfirmButton: true,
          }).then((confirm) => {
            if (confirm) {
              this.$router.push("/");
            }
          });
        });
    },
  },
};
</script>
