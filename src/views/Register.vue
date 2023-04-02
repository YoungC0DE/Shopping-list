<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <form class="form-signin text-center needs-validation" novalidate>
    <img src="@/assets/images/logo.png" alt="logo" width="200" height="150" />
    <h1 class="h3 mb-3 fw-normal">{{ $t("fieldForm.titleRegister") }}</h1>
    <div class="alert alert-danger" role="alert" v-if="no_values">
      {{ $t("noValues") }}
    </div>
    <div class="form-floating">
      <input type="text" class="form-control shadow-none rounded-top rounded-bottom-0 border-bottom-0" v-model="data.name" id="name" autocomplete="off" required />
      <label for="name"> {{ $t("fieldForm.name") }} </label>
    </div>
    <div class="form-floating">
      <input type="email" class="form-control shadow-none rounded-0" v-model="data.email" id="email" autocomplete="off" required />
      <label for="email">{{ $t("fieldForm.email") }}</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control shadow-none m-0 rounded-0" v-model="data.password" id="password" autocomplete="off" required />
      <label for="password">{{ $t("fieldForm.password") }}</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control shadow-none border-top-0" v-model="password_confirm" id="password_confirm" autocomplete="off" required />
      <label for="password_confirm">{{
        $t("fieldForm.passwordConfirm")
      }}</label>
    </div>
    <div class="alert alert-warning" role="alert" v-show="password_not_match">
      {{ $t("notMatchPassword") }}
    </div>
    <button class="w-100 btn btn-lg btn-primary mb-3" type="submit" v-on:click.prevent="register()">
      {{ $t("fieldForm.btnNewAccount") }}
    </button>
    <router-link to="/" class="text-decoration-none btn btn-outline-secondary w-100">
      {{ $t("fieldForm.btnLogin") }}
    </router-link>
  </form>
  <footer class="text-body mt-5 mb-3">
    <p class="m-0">&copy; 2023 youngcode.ltda</p>
  </footer>
</template>

<script lang="js">
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

      let urlData = `name=${this.data.name}&email=${this.data.email}&password=${this.data.password}`;
      axios
        .post(import.meta.env.VITE_BASE_API + "/users/register?" + urlData)
        .then(() => {
          // Go to Home Page
          Swal.fire({
            icon: "success",
            title: this.$t('swal.title.createdAccount'),
            text: this.$t('swal.desc.createdAccount'),
            showConfirmButton: true,
          }).then(() => {
            this.$router.push("/");
          });
        }).catch(() => {
          this.$toast.error(this.$t('toast.createdAccount'));
        })
    },
  },
};
</script>
