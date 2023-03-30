<style>
@import "@/assets/Dashboard.css";
</style>

<template>
  <div
    class="modal fade centered flex-row justify-content-between mb-1 responsive-btn"
    tabindex="-1"
    id="modalNewItem"
  >
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
              {{ $t("noValues") }}
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
              <label for="name">{{ $t("fieldForm.name") }}</label>
            </div>
            <div class="form-floating">
              <input
                type="number"
                class="form-control shadow-none rounded-0 border-bottom-0"
                v-model="newItem.amount"
                id="amount"
                placeholder="value"
                autocomplete="off"
                required
              />
              <label for="amount">{{ $t("fieldForm.amount") }}</label>
            </div>
            <div class="input-group">
              <select 
                class="form-select shadow-none rounded-0 border-bottom-0 p-3" 
                v-model="newItem.metric"
                id="metric"
                placeholder="value"
                autocomplete="off"
                required
              >
                <option selected disabled hidden value="">{{ $t("fieldForm.metric") }}</option>
                <option :value="$t('fieldForm.metricSelect.kilo')">{{ $t('fieldForm.metricSelect.kilo') }}</option>
                <option :value="$t('fieldForm.metricSelect.meter')">{{ $t('fieldForm.metricSelect.meter') }}</option>
                <option :value="$t('fieldForm.metricSelect.liter')">{{ $t('fieldForm.metricSelect.liter') }}</option>
                <option :value="$t('fieldForm.metricSelect.unit')">{{ $t('fieldForm.metricSelect.unit') }}</option>
              </select>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control shadow-none rounded-top-0"
                v-model="newItem.value"
                id="value"
                placeholder="value"
                autocomplete="off"
                required
              />
              <label for="value">{{ $t("fieldForm.value") }}</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="clear()"
          >
            {{ $t("fieldForm.btnClose") }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="actionModal"
          >
            {{
              modalInstance == "Register"
                ? $t("fieldForm.btnRegister")
                : $t("fieldForm.btnUpdate")
            }}
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="emptyList"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <h4 class="text-muted">{{ $t("emptyList.text") }}</h4>
    <img src="@/assets/images/icon8.png" />
    <h4>{{ $t("emptyList.complement") }}</h4>
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
      {{ $t("fieldForm.btnRegister") }}
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>

  <div v-else class="area-table d-flex flex-column gap-1">
    <nav class="navbar bg-body-tertiary rounded w-100">
      <div class="container-fluid">
        <form
          class="d-flex align-items-center w-100 mb-4"
          role="search"
          @submit.prevent
        >
          <label>{{ $t("fieldForm.search") }}: </label>
          <input
            class="form-control ms-2 me-2 shadow-none"
            type="search"
            v-model="search"
            placeholder="Item"
            aria-label="Item"
            :title="$t('title.search')"
            @keydown.enter.prevent
          />
          <button
            class="btn btn-outline-success shadow-none"
            v-on:click="findProductByName"
            title="Search"
            type="button"
          >
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div class="actions">
          <button
            type="button"
            class="btn btn-info"
            @click="loadProductsOnTable"
          >
            {{ $t("fieldForm.btnRefresh") }}
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
            {{ $t("fieldForm.btnRegister") }}
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </nav>

    <div class="table-responsive">
      <table
        class="table table-striped table-hover text-center table-bordered m-0 align-middle bg-body position-relative"
      >
        <thead class="bg-secondary text-light">
          <tr>
            <th>#</th>
            <th>{{ $t("fieldForm.name") }}</th>
            <th>{{ $t("fieldForm.amount") }}</th>
            <th>{{ $t("fieldForm.metric") }}</th>
            <th>{{ $t("fieldForm.value") }}</th>
            <th>{{ $t("fieldForm.action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.amount }}x</td>
            <td>{{ item.metric }}</td>
            <td>{{ $t("maskForm.prefixMoney") }} {{ item.value }}</td>
            <td>
              <i
                class="bi bi-pencil-square btn btn-warning btn-sm me-3"
                style="
                  --bs-btn-padding-y: 0.25rem;
                  --bs-btn-padding-x: 0.5rem;
                  --bs-btn-font-size: 0.75rem;
                "
                :title="$t('title.edit')"
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
                :title="$t('title.delete')"
                v-on:click="deleteItem(item.ID)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr />
    <div class="d-flex flex-row justify-content-between ps-5 pe-5">
      <b>Total</b>
      <b>{{ $t("maskForm.prefixMoney") }} {{ products_total }}</b>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      deviceWidth: screen.width,
      modalInstance: "",
      tableData: null,
      search: "",
      newItem: {
        prod_id: null,
        name: "",
        amount: "",
        metric: "",
        value: "",
      },
      products_total: 0,
      no_values: false,
      emptyList: false,
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
      Swal.fire({
        title: this.$t("swal.title.youSure"),
        text: this.$t("swal.desc.youSure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.$t("fieldForm.btnCancel"),
        confirmButtonText: this.$t("fieldForm.btnConfirm"),
      }).then((result) => {
        if (result.isConfirmed) {
          let dataUrl = `user_id=${this.store.user_id}&prod_id=${id}`;
          axios
            .delete(
              import.meta.env.VITE_BASE_API + "/products/delete?" + dataUrl
            )
            .then((resp) => {
              Swal.fire({
                icon: "success",
                title: resp.data.message || this.$t("swal.title.productDelete"),
                showConfirmButton: true,
              });
              this.loadProductsOnTable();
            })
            .catch(() => {
              this.$toast.error(this.$t("toast.productDelete"));
            });
        }
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
            title: resp.data.message || this.$t("swal.title.productChanged"),
            showConfirmButton: true,
          }).then((confirm) => {
            this.loadProductsOnTable();
            this.clear();
          });
        })
        .catch(() => {
          this.$toast.error(this.$t("toast.productChanged"));
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
          this.loadTotalProducts();
          if (data.data == undefined) this.emptyList = true;
          console.log(data.data == undefined);
        })
        .catch(() => {
          this.$toast.error(this.$t("toast.loadTable"));
        });
    },
    loadTotalProducts() {
      axios
        .get(
          import.meta.env.VITE_BASE_API +
            `/products/total?&user_id=${this.store.user_id}`
        )
        .then(({ data }) => {
          this.products_total = data.data;
        })
        .catch(() => {
          this.$toast.error(this.$t("toast.loadTotal"));
        });
    },
    findProductByName() {
      axios
        .get(
          import.meta.env.VITE_BASE_API +
            `/products/list&user_id=${this.store.user_id}&name=${this.search}`
        )
        .then(({ data }) => {
          this.tableData = data.data;
        })
        .catch(() => {
          this.$toast.error(this.$t("toast.findProduct"));
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
          this.clear();
        })
        .catch(() => {
          this.$toast.error(this.$t("toast.newItem"));
        });
    },
    clear() {
      this.newItem = {
        prod_id: "",
        name: "",
        amount: "",
        metric: "",
        value: "",
      };
    },
  },
  mounted() {
    this.loadTotalProducts();
    this.loadProductsOnTable();
  },
};
</script>
