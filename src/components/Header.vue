<template>
  <ul
    class="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
    id="pillNav2"
    role="tablist"
    style="
      --bs-nav-link-color: var(--bs-white);
      --bs-nav-pills-link-active-color: var(--bs-primary);
      --bs-nav-pills-link-active-bg: var(--bs-white);
    "
  >
    <li class="nav-item" role="presentation">
      <button
        class="nav-link rounded-5"
        id="home-tab2"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        aria-selected="false"
      >
        Perfil
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active rounded-5"
        id="profile-tab2"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        aria-selected="true"
      >
        Minha Lista
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link rounded-5"
        id="contact-tab2"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        aria-selected="false"
      >
        Contact
      </button>
    </li>
  </ul>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {

        }
    }
}
</script>