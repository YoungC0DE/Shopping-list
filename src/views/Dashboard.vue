<style>
@import "@/assets/Dashboard.css";
</style>

<template>
  <div class="d-flex flex-row justify-content-between mb-1 responsive-btn">
    <button type="button" class="btn btn-info" @click="loadProductsOnTable">
      Atualizar
      <i class="bi bi-arrow-clockwise"></i>
    </button>
  </div>
  <div class="mobile-table">
    <table
      class="table table-striped table-hover text-center table-bordered m-0 align-middle"
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Medida</th>
          <th scope="col">Valor</th>
          <th scope="col">Ação</th>
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
            ></i>
            <i
              class="bi bi-trash btn btn-danger btn-sm"
              style="
                --bs-btn-padding-y: 0.25rem;
                --bs-btn-padding-x: 0.5rem;
                --bs-btn-font-size: 0.75rem;
              "
              title="Deletar"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: {},
    };
  },
  methods: {
    loadProductsOnTable() {
      let id_user = sessionStorage.getItem("id_user");
      axios
        .get(
          import.meta.env.VITE_BASE_API + `/products/list&user_id=${id_user}`
        )
        .then(({ data }) => {
          this.tableData = data.data;
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
