<style>
@import "@/assets/Dashboard.css";
</style>

<template>
  <div class="d-flex flex-row justify-content-between mb-1 responsive-btn">
    <!-- modal -->
    <div class="modal fade centered" tabindex="-1" id="modalNewItem">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalInstance }} item</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="form-signin text-center needs-validation" novalidate>
              <div class="alert alert-danger" role="alert" v-if="no_values">
                Fill in all fields.
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control shadow-none rounded-bottom-0 border-bottom-0"
                  v-model="newItem.name"
                  id="name"
                  placeholder="name@example.com"
                  autocomplete="off"
                  required
                />
                <label for="name">Name</label>
              </div>
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control shadow-none rounded-0 border-bottom-0"
                  v-model="newItem.amount"
                  id="amount"
                  placeholder="Password"
                  autocomplete="off"
                  required
                />
                <label for="amount">Amount</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control shadow-none rounded-0 border-bottom-0"
                  v-model="newItem.metric"
                  id="metric"
                  placeholder="Password"
                  autocomplete="off"
                  required
                />
                <label for="metric">Metric</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control shadow-none rounded-top-0"
                  v-model="newItem.value"
                  id="value"
                  placeholder="Password"
                  autocomplete="off"
                  required
                />
                <label for="value">Value</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="actionModal"
            >
              {{ modalInstance }}
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-info" @click="loadProductsOnTable">
      Refresh
      <i class="bi bi-arrow-clockwise"></i>
    </button>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalNewItem"
      @click="
        () => {
          modalInstance = 'Register';
        }
      "
    >
      Add item
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>
  <div class="mobile-table">
    <table
      class="table table-striped table-hover text-center table-bordered m-0 align-middle"
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Metric</th>
          <th scope="col">Value</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <th scope="row">{{ item.ID }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.metric }}</td>
          <td>{{ item.value }}</td>
          <td>
            <i
              class="bi bi-pencil-square btn btn-warning btn-sm me-3"
              style="
                --bs-btn-padding-y: 0.25rem;
                --bs-btn-padding-x: 0.5rem;
                --bs-btn-font-size: 0.75rem;
              "
              title="Editar"
              data-bs-toggle="modal"
              data-bs-target="#modalNewItem"
              v-on:click="openModalEdit(item)"
            ></i>
            <i
              class="bi bi-trash btn btn-danger btn-sm"
              style="
                --bs-btn-padding-y: 0.25rem;
                --bs-btn-padding-x: 0.5rem;
                --bs-btn-font-size: 0.75rem;
              "
              title="Deletar"
              v-on:click="deleteItem(item.ID)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      modalInstance: "",
      tableData: {},
      newItem: {
        prod_id: null,
        name: "",
        amount: "",
        metric: "",
        value: "",
      },
      no_values: false,
    };
  },
  setup() {
    const store = useUserStore();
    return {
      store,
    };
  },
  methods: {
    actionModal() {
      if (this.modalInstance == "Update") this.editItem();
      if (this.modalInstance == "Register") this.createNewItem();
    },
    deleteItem(id) {
      let dataUrl = `user_id=${this.store.user_id}&prod_id=${id}`;
      axios
        .delete(import.meta.env.VITE_BASE_API + "/products/delete?" + dataUrl)
        .then((resp) => {
          Swal.fire({
            icon: "success",
            title: resp.data.message,
            showConfirmButton: true,
          });
          this.loadProductsOnTable();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModalEdit(data) {
      this.modalInstance = "Update";
      this.newItem = {
        prod_id: data.ID,
        name: data.name,
        amount: data.amount,
        metric: data.metric,
        value: data.value,
      };
    },
    editItem() {
      if (this.validate()) return;
      // set axios data to put
      let dataUrl = `user_id=${this.store.user_id}&prod_id=${this.newItem.prod_id}&name=${this.newItem.name}&amount=${this.newItem.amount}&metric=${this.newItem.metric}&value=${this.newItem.value}`;
      axios
        .put(import.meta.env.VITE_BASE_API + "/products/edit?" + dataUrl)
        .then((resp) => {
          Swal.fire({
            icon: "success",
            title: resp.data.message,
            showConfirmButton: true,
          }).then((confirm) => {
            this.loadProductsOnTable();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.no_values = false;

      var forms = document.querySelectorAll(".needs-validation");
      forms.forEach((form) => form.classList.add("was-validated"));

      if (
        !this.newItem.name ||
        !this.newItem.amount ||
        !this.newItem.metric ||
        !this.newItem.value
      ) {
        this.no_values = true;
        return true;
      }
      return false;
    },
    loadProductsOnTable() {
      axios
        .get(
          import.meta.env.VITE_BASE_API +
            `/products/list&user_id=${this.store.user_id}`
        )
        .then(({ data }) => {
          this.tableData = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createNewItem() {
      if (this.validate()) return;
      let dataUrl = `user_id=${this.store.user_id}&name=${this.newItem.name}&amount=${this.newItem.amount}&metric=${this.newItem.metric}&value=${this.newItem.value}`;
      axios
        .post(import.meta.env.VITE_BASE_API + "/products/register?" + dataUrl)
        .then((resp) => {
          Swal.fire({
            icon: "success",
            title: resp.data.message,
            showConfirmButton: true,
          });
          this.loadProductsOnTable();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.loadProductsOnTable();
  },
};
</script>
