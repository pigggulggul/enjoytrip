<script setup>
import "./assets/scss/common.scss";
import "./assets/scss/variables.scss";
import Header from "./components/Haeder.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<style scoped></style>
