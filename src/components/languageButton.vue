<template>
  <div class="dropdown position-fixed bottom-0 start-0 mb-3 ms-3 bd-mode-toggle">
    <button class="btn btn-secondary dropdown-toggle d-flex align-items-center gap-1" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
      <i class="bi bi-translate"></i>
      <span class="hide-me-for-responsive"> {{ currentLocale.replace("_", "-").toLowerCase() }} </span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
      <li>
        <button type="button" class="dropdown-item d-flex align-items-center" :class="currentLocale == 'pt_BR' ? 'bg-primary text-white' : ''" @click="changeLocale('pt_BR')">
          {{ $t("idioms.PT_BR") }}
        </button>
      </li>
      <li>
        <button type="button" class="dropdown-item d-flex align-items-center" :class="currentLocale == 'en_US' ? 'bg-primary text-white' : ''" @click="changeLocale('en_US')">
          {{ $t("idioms.EN_US") }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLocale: this.$i18n.locale,
    };
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
      this.currentLocale = locale;
    },
  },
};
</script>
