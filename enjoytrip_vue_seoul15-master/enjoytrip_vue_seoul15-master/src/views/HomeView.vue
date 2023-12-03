<script setup>
import "../assets/scss/2_pages/main.scss";
import AttractionCard from "@/components/AttractionCard.vue";
import { ref, onMounted } from "vue";
import { postAttraction, getGugun } from "../api/attraction";
import { useRouter } from "vue-router";
import SearchAttr from "@/components/attraction/SearchBarMain.vue";

const router = useRouter();
const attlist = ref([
  {
    title: "국립 청태산자연휴양림",
    address: "강원도 횡성군 둔내면 청태산로 610",
    img: `http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg`,
  },
  {
    title: "국립 유명산자연휴양림",
    address: "경기도 가평군 설악면 유명산길 79-53",
    img: `http://tong.visitkorea.or.kr/cms/resource/77/219377_image2_1.jpg`,
  },
  {
    title: "대구 달성공원",
    address: "대구광역시 중구 달성공원로 35",
    img: `http://tong.visitkorea.or.kr/cms/resource/94/1026094_image2_1.jpg`,
  },
  {
    title: "천지연폭포 (제주도 국가지질공원)",
    address: "제주특별자치도 서귀포시 천지동",
    img: `http://tong.visitkorea.or.kr/cms/resource/96/2612496_image2_1.jpg`,
  },
  {
    title: "지리산국립공원(하동)",
    address: "경상남도 하동군 화개면 화개로",
    img: `http://tong.visitkorea.or.kr/cms/resource/13/1320913_image2_1.jpg`,
  },
]);
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <section class="inner">
    <div class="mainIntro-wrap">
      <div class="intro-title">
        <p>아름다운 대한민국의 관광지</p>
        <h4>국내 모든곳의 관광지와 문화행사를 한눈에 확인 할 수 있습니다.</h4>
        <RouterLink to="/attraction" class="btn btn-black radius50"
          >여행지 검색</RouterLink
        >
      </div>

      <div class="intro-imgwrap">
        <div class="intro-img-top">
          <div><img src="@/assets/images/introbg1.jpg" alt="" /></div>
          <div><img src="@/assets/images/introbg4.jpg" alt="" /></div>
        </div>
        <div class="intro-img-bottom">
          <div><img src="@/assets/images/introbg2.jpg" alt="" /></div>
          <div><img src="@/assets/images/introbg3.jpg" alt="" /></div>
        </div>
      </div>
    </div>
    <div class="horizonbar2"></div>
    <section class="explain-wrap">
      <h4 class="explain-title">Search Culture</h4>
      <p class="explain-content">
        관광지 검색, 여행플래너 계획으로 여행에 활력을 넣어보세요.
      </p>
      <ul class="explain-item-wrap">
        <RouterLink to="/attraction" class="explain-item">
          <li>
            <h5>관광지 검색</h5>
            <p>
              검색하고자 하는 도시와 구/군, 문화시설을 검색하여 자신의 의도와
              같은 문화재, 편의시설을 검색 할 수 있습니다.
            </p>
          </li>
        </RouterLink>
        <RouterLink to="/plan" class="explain-item">
          <li>
            <h5>여행플래너</h5>
            <p>
              자신만의 여행 플래너를 만들어 색다르고 나만의 개성있는 여행 계획을
              짤 수 있습니다.
            </p>
          </li>
        </RouterLink>
        <RouterLink to="/attraction" class="explain-item">
          <li>
            <h5>관광지 검색</h5>
            <p>
              검색하고자 하는 도시와 구/군, 문화시설을 검색하여 자신의 의도와
              같은 문화재, 편의시설을 검색 할 수 있습니다.
            </p>
          </li>
        </RouterLink>
      </ul>
    </section>

    <div class="horizonbar1"></div>

    <section class="recom-section">
      <h4>Tourist</h4>
      <p>국내에 있는 여러 여행지의 목록을 찾아보세요</p>
      <ul class="card-ul">
        <li>
          <AttractionCard
            :title="attlist[0].title"
            :address="attlist[0].address"
            :img="attlist[0].img"
          />
        </li>
        <li>
          <AttractionCard
            :title="attlist[1].title"
            :address="attlist[1].address"
            :img="attlist[1].img"
          />
        </li>
        <li>
          <AttractionCard
            :title="attlist[2].title"
            :address="attlist[2].address"
            :img="attlist[2].img"
          />
        </li>
        <li>
          <AttractionCard
            :title="attlist[3].title"
            :address="attlist[3].address"
            :img="attlist[3].img"
          />
        </li>
      </ul>
    </section>
    <div class="horizonbar2"></div>
  </section>
</template>

<style scoped>
.inner {
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
