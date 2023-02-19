<template>
  <main
    class="d-flex flex-column justify-content-center align-items-center w-100 vh-100"
  >
    <table class="table table-striped table-hover w-50 text-center">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nome</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Medida</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex flex-row justify-content-center align-items-center w-50">
      <HeaderComponent />
    </div>
  </main>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
export default {
  components: { HeaderComponent },
};
</script>
