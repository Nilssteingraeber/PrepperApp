<script setup lang="ts">
import CycleSelectionHeader from '../CycleHeader/CycleSelectionHeader.vue'
import SearchBar from '../SearchBar/SearchBar.vue'
</script>

<template>
  <nav class="navbar navbar-expand-xl bg-white fixed-top">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <CycleSelectionHeader />
      <SearchBar class="ms-auto" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow:
    0 0px 3px 0 rgba(var(--bs-box-shadow-color-rgb), 0.07),
    0 2px 2px 0 rgba(var(--bs-box-shadow-color-rgb), 0.04);

  padding-top: 0.5625rem;
  margin-left: 240px;
}

@media (max-width: 1200px) {
  .navbar {
    margin-left: 0px;
  }
}
</style>
