<script setup>
import { onMounted } from "vue";
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
