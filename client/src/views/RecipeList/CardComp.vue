<template>
  <div class="card">
    <slot name="header"></slot>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  --bs-card-spacer-y: 1.5rem;
  --bs-card-spacer-x: 1.5rem;
  --bs-card-border-radius: 0.5rem;
  --bs-card-inner-border-radius: calc(0.5rem - 1);
  --bs-card-cap-padding-y: 0.75rem;
  --bs-card-cap-padding-x: 1.5rem;
  --bs-card-cap-bg: rgba(255, 255, 255, 0);
  --bs-card-img-overlay-padding: 1.5rem;
  --bs-card-border-width: 2px;
  --bs-card-border-color: #f5f5f5;
  box-shadow:
    0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04);
  border: 0;
}
</style>
