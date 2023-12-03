<script setup>
import { computed, ref } from "vue";
import imgSrc from "../../assets/images/noimage.png";
const props = defineProps([
  "title",
  "firstImage",
  "contentTypeId",
  "latitude",
  "longitude",
  "no",
]);

const emit = defineEmits(["deleteTrip"]);

const deleteArgs = function () {
  emit("deleteTrip", props.no);
};

//이미지 오류
function replaceByDefault(e) {
  console.log("오류");
  e.target.src = imgSrc;
}

const contentName = computed(() => {
  console.log(props);
  if (props.contentTypeId == "12") {
    contentType.value = "contentAtt";
    return "관광지";
  } else if (props.contentTypeId == "14") {
    contentType.value = "contentCul";
    return "문화시설";
  } else if (props.contentTypeId == "15") {
    contentType.value = "contentFes";
    return "축제공연행사";
  } else if (props.contentTypeId == "25") {
    contentType.value = "contentTra";
    return "여행코스";
  } else if (props.contentTypeId == "28") {
    contentType.value = "contentRep";
    return "레포츠";
  } else if (props.contentTypeId == "32") {
    contentType.value = "contentHot";
    return "숙박";
  } else if (props.contentTypeId == "38") {
    contentType.value = "contentSho";
    return "쇼핑";
  } else {
    contentType.value = "contentFod";
    return "음식점";
  }
});
const contentType = ref("");
</script>
<template>
  <div class="route-card-wrap">
    <img
      class="route-card-bg"
      :src="props.firstImage"
      @error="replaceByDefault"
      alt=""
    />
    <p class="route-card-title">{{ props.title }}</p>
    <div class="route-delete" @click="deleteArgs">
      <span class="material-symbols-outlined"> remove </span>
    </div>
    <p :class="contentType">{{ contentName }}</p>
  </div>
</template>

<style scoped>
.route-card-wrap {
  padding: 4px;
  border-radius: 20px;
  width: 90%;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.route-card-wrap .route-card-bg {
  width: 100%;
  height: 180px;
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
.route-delete {
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: 50px;
  background-color: white;
}
.contentAtt,
.contentCul,
.contentFes,
.contentTra,
.contentRep,
.contentAtt,
.contentFod,
.contentHot,
.contentSho {
  display: block;
  width: fit-content;
  padding: 8px 10px;
  border-radius: 25px;
  border: 1px solid;
}

.contentAtt {
  background-color: #ff0060;
  color: white;
}

.contentCul {
  background-color: #fa7100;
  color: white;
}

.contentFes {
  background-color: #00dfa2;
  color: white;
}

.contentTra {
  background-color: #0079ff;
  color: white;
}

.contentRep {
  background-color: #27005d;
  color: white;
}

.contentAtt {
  background-color: #3f1d38;
  color: white;
}
.contentFod {
  background-color: var(--color-skyblue-2);
  color: white;
}

.contentSho {
  background-color: var(--color-navy-3);
  color: white;
}

.contentHot {
  background-color: cadetblue;
  color: white;
}
</style>
