<template>
  <div class="d-flex flex-row justify-content-between mb-1">
    <button type="button" class="btn btn-outline-primary">Atualizar</button>
    <button type="button" class="btn btn-outline-success">Novo Item</button>
  </div>
  <table
    class="table table-striped table-hover text-center table-bordered m-0 border border-2"
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
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>editar</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@mdo</td>
        <td>editar</td>
      </tr>
    </tbody>
  </table>
</template>
