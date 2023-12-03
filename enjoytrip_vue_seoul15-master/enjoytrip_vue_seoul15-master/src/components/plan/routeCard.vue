<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps(["name", "index", "planNo"]);

const bg = computed(() => {
  const random = getRandom(1, 25);
  return `background-image: url(/src/assets/images/sampleimage${random}.jpg)`;
});
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const titleName = computed(() => {
  return `${props.index + 1}. ${props.name}`;
});

const emit = defineEmits(["addNoAttr", "clickShowRoute", "deletePlan"]);
const addNoAttrArgs = function () {
  emit("addNoAttr", props.index, props.planNo);
};
const showRouteArgs = function () {
  emit("clickShowRoute", props.index, props.planNo);
};
const deleteArgs = function () {
  emit("deletePlan", props.planNo);
};
</script>

<template>
  <div class="route-card-wrap">
    <div class="route-card-bg" :style="bg"></div>
    <p class="route-card-title">{{ titleName }}</p>

    <div class="route-btn-wrap">
      <div class="route-btn" @click="addNoAttrArgs">
        <span class="material-symbols-outlined"> add_circle </span>
        <p>추가하기</p>
      </div>
      <div class="route-btn" @click="showRouteArgs">
        <span class="material-symbols-outlined"> route </span>
        <p>경로 보기</p>
      </div>
    </div>
    <div class="route-delete" @click="deleteArgs">
      <span class="material-symbols-outlined"> remove </span>
    </div>
  </div>
</template>

<style scoped>
.route-card-wrap {
  padding: 4px;
  border-radius: 20px;
  width: 90%;
  height: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.route-card-wrap .route-card-bg {
  width: 100%;
  height: 220px;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
.route-card-title {
  font-size: 16px;
  font-weight: 700;
  color: black;
  width: fit-content;
  border-radius: 4px;
  background-color: white;
  margin: 10px 0;
}
.route-btn-wrap {
  display: flex;
}
.route-card-wrap .route-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 500;
  margin: 8px 8px;
  cursor: pointer;
  font-size: 14px;
  background-color: #eee;
  padding: 4px 6px;
  border-radius: 10px;
}
.route-btn > p {
  margin: 0 6px;
}
.route-delete {
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: 50px;
  background-color: white;
}
@media screen and (max-width: 992px) {
  .route-card-wrap {
    height: fit-content;
  }
  .route-card-wrap .route-card-bg {
    height: 160px;
  }
  .route-card-title {
    position: absolute;
    left: 30px;
    top: 10px;
    font-size: 24px;
    background-color: transparent;
  }
  .route-btn-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
@media screen and (max-width: 768px) {
}
</style>
