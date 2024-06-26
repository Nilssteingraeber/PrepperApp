<template>
  <nav class="navbar navbar-expand-lg bg-white fixed-top">
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
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.navbar {
  box-shadow:
    0 4px 12px 0 rgba(var(--bs-box-shadow-color-rgb), 0.07),
    0 2px 4px rgba(var(--bs-box-shadow-color-rgb), 0.05);

  padding-top: 0.5625rem;
  padding-left: 240px;
}

@media (max-width: 992px) {
  .navbar {
    padding-left: 8px;
  }
}
</style>
