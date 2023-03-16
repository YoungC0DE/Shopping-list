<style>
@import "@/assets/Profile.css";
</style>

<template>
  <img
    :src="data.avatar"
    class="img-thumbnail rounded mx-auto d-block rounded-circle p-0 mb-5"
  />

  <form
    class="form-signin text-center needs-validation w-50 mx-auto responsive-view"
    novalidate
  >
    <h1 class="h3 mb-3 fw-normal">Profile</h1>
    <div class="alert alert-warning" role="alert" v-if="password_not_match">
      Enter your password before changing data.
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control shadow-none rounded-top rounded-bottom-0 border-bottom-0"
        v-model="data.avatar"
        id="name"
        autocomplete="off"
        required
      />
      <label for="name">Url Image</label>
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control shadow-none rounded-0 border-bottom-0"
        v-model="data.name"
        id="url"
        autocomplete="off"
        required
      />
      <label for="url">Name</label>
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control shadow-none rounded-0 border-bottom-0"
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
      <label for="password">Password</label>
    </div>
    <div class="form-floating mb-4">
      <input
        type="password"
        class="form-control shadow-none border-top-0 rounded-top-0"
        v-model="password_confirm"
        id="value"
        autocomplete="off"
        required
      />
      <label for="value">Confirm your password</label>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary mb-2"
      type="submit"
      v-on:click.prevent="saveChanges()"
    >
      Save changes
    </button>
  </form>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/user";

export default {
  components: { HeaderComponent },
  data() {
    return {
      data: {
        user_id: null,
        avatar: "",
        name: "",
        email: "",
        password: "",
      },
      no_values: false,
      password_not_match: false,
      password_confirm: "",
    };
  },
  setup() {
    const store = useUserStore();
    return {
      store,
    };
  },
  methods: {
    renderData() {
      this.data.user_id = this.store.user_id;
      this.data.avatar = this.store.avatar;
      this.data.name = this.store.name;
      this.data.email = this.store.email;
    },
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
    saveChanges() {
      if (this.validate()) return;
      let urlData = `user_id=${this.data.user_id}&avatar=${this.data.avatar}&name=${this.data.name}&email=${this.data.email}&password=${this.data.password}`;
      axios
        .put(import.meta.env.VITE_BASE_API + "/users/edit?" + urlData)
        .then(() => {
          this.store.user_id = this.data.user_id;
          this.store.avatar = this.data.avatar;
          this.store.name = this.data.name;
          this.store.email = this.data.email;
          // Go to Home Page
          Swal.fire({
            icon: "success",
            title: "Changed data",
            text: "Successfully changed data.",
          }).then(() => {
            this.$router.push({ name: "Dashboard" });
          });
        }).catch((error) => {
          this.$toast.error(error);
        })
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>
