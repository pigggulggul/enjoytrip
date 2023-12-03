<script setup>
import { computed } from "vue";
import "../assets/scss/4_components/AttractionCard.scss";
import "../assets/scss/common.scss";

const props = defineProps(["title", "address", "img"]);
</script>

<template>
  <div class="card-wrap">
    <img class="card-img" :src="props.img" alt="" />
    <div class="card-content">
      <h4 class="card-title">{{ props.title }}</h4>
      <p class="card-add">{{ props.address }}</p>
      <div class="btn btn-main">
        <RouterLink to="/attraction" class="explain-item">
          자세히 보기
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrap {
  background-color: white;
  border: 2px solid #b2b2b2;
}
a {
  color: var(--color-main);
}
.btn:hover a {
  color: white;
}
</style>
