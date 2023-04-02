<style scoped>
@import "@/assets/Profile.css";
</style>

<template>
  <div id="profile" class="d-flex flex-column align-items-center">
    <main class="w-75">
      <img :src="data.avatar" class="img-thumbnail rounded mx-auto d-block rounded-circle mb-5" />

      <form class="form-signin text-center needs-validation w-50 mx-auto responsive-view" novalidate>
        <h1 class="h3 mb-3 fw-normal">{{ $t("titleScreen.profile") }}</h1>
        <div class="alert alert-warning" role="alert" v-if="password_not_match">
          {{ $t("notMatchPassword") }}
        </div>
        <div class="form-floating">
          <input type="text" class="form-control shadow-none rounded-top rounded-bottom-0 border-bottom-0" v-model="data.avatar" id="name" autocomplete="off" required />
          <label for="name"> {{ $t("fieldForm.urlImage") }} </label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control shadow-none rounded-0 border-bottom-0" v-model="data.name" id="url" autocomplete="off" required />
          <label for="url"> {{ $t("fieldForm.name") }} </label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control shadow-none rounded-0 rounded-bottom" v-model="data.email" id="email" autocomplete="off" required />
          <label for="email"> {{ $t("fieldForm.email") }} </label>
        </div>
        <div class="form-check form-switch d-flex flex-row align-items-center justify-content-center mt-4 mb-4 gap-2">
          <input class="form-check-input" type="checkbox" role="switch" v-model="changePassword" id="changePassword" />
          <label class="form-check-label" for="changePassword">
            {{ $t("fieldForm.changePassword") }}
          </label>
        </div>
        <div v-if="changePassword">
          <div class="form-floating">
            <input type="password" class="form-control shadow-none m-0 rounded-0 rounded-top" v-model="data.password" id="password" autocomplete="off" required />
            <label for="password"> {{ $t("fieldForm.password") }} </label>
          </div>
          <div class="form-floating mb-4">
            <input type="password" class="form-control shadow-none border-top-0 rounded-top-0" v-model="password_confirm" id="value" autocomplete="off" required />
            <label for="value"> {{ $t("fieldForm.passwordConfirm") }} </label>
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary mb-2" type="submit" v-on:click.prevent="saveChanges()">
          {{ $t("fieldForm.btnSave") }}
        </button>
      </form>
    </main>
  </div>
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
      changePassword: false,
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
        user_id: this.store.user_id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      };

      sessionStorage.setItem(
        "piniaState",
        btoa(
          JSON.stringify({
            user_id: this.store.user_id,
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            level: this.store.level,
          })
        )
      );
    },
    renderData() {
      this.data.user_id = this.store.user_id;
      this.data.avatar = this.store.avatar;
      this.data.name = this.store.name;
      this.data.email = this.store.email;
    },
    validate() {
      var forms = document.querySelectorAll(".needs-validation");
      forms.forEach((form) => form.classList.add("was-validated"));

      if (!this.data.email || !this.data.name) {
        if (this.changePassword && (this.password_confirm != this.data.password)) {
          this.password_not_match = true;
        }
        this.no_values = true;
        return true;
      }
    },
    saveChanges() {
      if (this.validate()) return;
      let urlData = `user_id=${this.data.user_id}&avatar=${this.data.avatar
        }&name=${this.data.name}&email=${this.data.email}&password=${this.changePassword ? this.data.password : ""
        }`;
      axios
        .put(import.meta.env.VITE_BASE_API + "/users/edit?" + urlData)
        .then(() => {
          this.setData(this.data)
          // Go to Home Page
          Swal.fire({
            icon: "success",
            title: this.$t("swal.title.changedData"),
            text: this.$t("swal.desc.changedData"),
          })
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
  },
  mounted() {
    this.renderData();
  },
};
</script>
