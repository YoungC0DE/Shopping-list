<style scoped>
@import "@/assets/Login.css";
</style>

<template>
  <form class="form-signin text-center needs-validation mx-auto" novalidate>
    <h1 class="h3 mb-3 fw-normal">Adicione um novo item</h1>
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
      <label for="name">Nome do item</label>
    </div>
    <div class="form-floating">
      <input
        type="number"
        class="form-control shadow-none rounded-0 border-bottom-0"
        v-model="data.amount"
        id="amount"
        autocomplete="off"
        required
      />
      <label for="amount">Quantidade</label>
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control shadow-none m-0 rounded-0"
        v-model="data.metric"
        id="metric"
        autocomplete="off"
        required
      />
      <label for="metric">Medida</label>
    </div>
    <div class="form-floating mb-4">
      <input
        type="text"
        class="form-control shadow-none border-top-0 rounded-top-0"
        v-model="data.value"
        id="value"
        autocomplete="off"
        required
      />
      <label for="value">Valor</label>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary mb-2"
      type="submit"
      v-on:click.prevent="register()"
    >
      Registrar item
    </button>
    <router-link
      to="/home"
      class="text-decoration-none btn btn-outline-secondary w-100"
    >
      Cancelar
    </router-link>
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
        id_user: "",
        name: "",
        amount: "",
        metric: "",
        value: "",
      },
      no_values: false,
    };
  },
  methods: {
    validate() {
      var forms = document.querySelectorAll(".needs-validation");
      forms.forEach((form) => form.classList.add("was-validated"));

      if (!this.data.name || !this.data.amount || !this.data.metric || !this.data.value) {
        this.no_values = true;
        return true;
      }
    },
    register() {
      if (this.validate()) return;

      axios
        .post(import.meta.env.VITE_BASE_API + "/products/register", this.data)
        .then((resp) => {
          console.log(resp);
          // Go to Home Page
          Swal.fire({
            icon: "success",
            title: "Produto registrado com sucesso!",
            showConfirmButton: true,
          }).then((confirm) => {
            if (confirm) {
              this.$router.push("/home");
            }
          });
        });
    },
  },
  mounted() {
    this.data.id_user = sessionStorage.getItem("id_user");
  },
};
</script>
