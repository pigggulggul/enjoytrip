<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAttraction } from "@/api/attraction";
import AttractionDetailMap from "./AttractionDetailMap.vue";
import "../../assets/scss/4_components/AttractionDetail.scss";

const route = useRoute();
const router = useRouter();
const { contentid } = route.params;

const attraction = ref({});

// onMounted(() => {
//   getAttractionDetail();
// });

const getAttractionDetail = async () => {
  // const { articleno } = route.params;
  console.log(contentid + "번 관광지 얻으러 가자!!!");
  await getAttraction(
    contentid,
    ({ data }) => {
      attraction.value = data;
      console.log(attraction.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

getAttractionDetail();
</script>

<template>
  <section class="detail-section">
    <div class="detail-wrap">
      <div class="att-detail-top-wrap">
        <img :src="attraction.firstImage" />
        <AttractionDetailMap class="att-map" :attraction-detail="attraction" />
      </div>

      <h1>{{ attraction.title }}</h1>

      <h2>About</h2>
      <p>{{ attraction.overview }}</p>

      <ul>
        <li>문의 및 안내 : {{ attraction.tel }}</li>
        <li>주소 : {{ attraction.addr1 }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
