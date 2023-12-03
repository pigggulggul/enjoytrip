<script setup>
import { onMounted, ref } from "vue";
import "../../assets/scss/2_pages/AttractionView.scss";
import {
  getAttraction,
  postAttraction,
  postAttractionCount,
  getGugun,
} from "../../api/attraction";
import { useRoute, useRouter } from "vue-router";
import imgSrc from "@/assets/images/noimage.png";
import PageNavigation from "../common/PageNavigation.vue";

const router = useRouter();

const contentTypeId = ref(0);
const sidoCode = ref(0);
const gugunCode = ref(0);
const size = ref(10);
const keyword = ref("");
const gugunlist = ref();
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

const searchSample = ref({
  contentTypeId: contentTypeId,
  gugunCode: gugunCode,
  keyword: keyword,
  sidoCode: sidoCode,
  size: VITE_ARTICLE_LIST_SIZE,
  pgno: currentPage,
});
const attractionlist = ref([]);

const changeSido = () => {
  const sidoSelect = document.querySelector(".search-sido");
  sidoCode.value = sidoSelect.options[sidoSelect.selectedIndex].value;
  getGugun(sidoCode.value).then((res) => {
    gugunlist.value = res;
  });
};
const changeGugun = () => {
  const gugunSelect = document.querySelector(".search-gugun");
  gugunCode.value = gugunSelect.options[gugunSelect.selectedIndex].value;
};
const changeContentType = () => {
  const contentSelect = document.querySelector(".search-type");
  contentTypeId.value =
    contentSelect.options[contentSelect.selectedIndex].value;
};
const searchAttractions = () => {
  postAttraction(searchSample).then((res) => {
    attractionlist.value = res;
    console.log(attractionlist.value);
    currentPage.value = attractionlist.value.currentPage;
    totalPage.value = attractionlist.value.totalPageCount;
  });
  window.scrollTo(0, 400);
};
const moveDetail = (contentId) => {
  router.push({ name: "attraction-detail", params: { contentid: contentId } });
};
function replaceByDefault(e) {
  e.target.src = imgSrc;
}

//스크롤이벤트//
const scrollNum = ref(0);
const scrollSearch = ref("");
const scrollEvt = () => {
  scrollNum.value = window.scrollY;
  console.log(scrollNum.value);
  if (window.scrollY > 700) {
    scrollSearch.value = "";
  } else {
    scrollSearch.value = "none";
  }
};

//////페이지네이션//////

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  searchAttractions();
};
///////////////////////

onMounted(() => {
  document.addEventListener("scroll", scrollEvt);
  scrollSearch.value = "none";
});
</script>

<template>
  <div class="inner">
    <div class="attract-top-bg">
      <h4>대한민국에 있는 어느 곳이든 다 찾을 수 있습니다</h4>
      <p>지역을 검색하면 본인이 원하는 곳의 문화시설을 볼 수 있습니다.</p>
      <div class="simple-search-bottom">
        <ul class="search-wrap">
          <li class="search-sido-wrap">
            <p>시 / 도</p>
            <!-- 시도 백엔드 받아오기 -->
            <div>
              <span class="material-symbols-outlined"> public </span>
              <select class="search-sido" @change="changeSido">
                <option value selected>도시를 선택해주세요</option>
                <option value="1">서울특별시</option>
                <option value="2">인천</option>
                <option value="3">대전광역시</option>
                <option value="4">대구광역시</option>
                <option value="5">광주광역시</option>
                <option value="6">부산광역시</option>
                <option value="7">울산광역시</option>
                <option value="31">경기도</option>
                <option value="32">강원도</option>
                <option value="33">충청북도</option>
                <option value="34">충청남도</option>
                <option value="35">경상북도</option>
                <option value="36">경상남도</option>
                <option value="37">전라북도</option>
                <option value="38">전라남도</option>
                <option value="39">제주도</option>
              </select>
            </div>
          </li>
          <li class="search-gugun-wrap">
            <p>구 / 군</p>
            <div>
              <span class="material-symbols-outlined"> location_city </span>
              <select class="search-gugun" @change="changeGugun">
                <option selected>구/군을 선택해주세요</option>
                <option
                  v-for="(item, index) in gugunlist"
                  :value="item.gugunCode"
                >
                  {{ item.gugunName }}
                </option>
              </select>
            </div>
          </li>
          <li class="search-type-wrap">
            <p>편의시설 유형</p>
            <div>
              <span class="material-symbols-outlined"> storefront </span>
              <select class="search-type" @change="changeContentType">
                <option selected>관광정보선택</option>
                <option value="12">관광지</option>
                <option value="14">문화시설</option>
                <option value="15">축제공연행사</option>
                <option value="25">여행코스</option>
                <option value="28">레포츠</option>
                <option value="32">숙박</option>
                <option value="38">쇼핑</option>
                <option value="39">음식점</option>
              </select>
            </div>
          </li>
          <li class="search-keyword-wrap">
            <p>검색어</p>
            <div>
              <span class="material-symbols-outlined"> search </span>
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                v-model="keyword"
              />
            </div>
          </li>
          <li class="search-btn-wrap">
            <button class="search-btn" @click="searchAttractions">검색</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="attract-result-wrap">
      <h2 class="attract-result-title">여행지 검색결과</h2>
      <ul class="attract-wrap">
        <li
          class="attract-item-wrap"
          v-for="(item, index) in attractionlist.attractions"
          :key="item.contentId"
          @click="moveDetail(item.contentId)"
        >
          <div class="attract-left">
            <img
              class="attract-img"
              :src="item.firstImage"
              @error="replaceByDefault"
              alt=""
            />
          </div>
          <hr />
          <div class="attract-right">
            <h3 class="attract-title">{{ item.title }}</h3>
            <h4 class="attract-addr">{{ item.addr1 }}</h4>
            <p class="attract-gio">
              {{ item.latitude }} / {{ item.longitude }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <PageNavigation
      class="pagenation"
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    ></PageNavigation>
    <div :class="scrollSearch">
      <div class="simple-search-bottom">
        <ul class="search-wrap">
          <li class="search-sido-wrap">
            <p>시 / 도</p>
            <!-- 시도 백엔드 받아오기 -->
            <div>
              <span class="material-symbols-outlined"> public </span>
              <select class="search-sido" @change="changeSido">
                <option value selected>도시를 선택해주세요</option>
                <option value="1">서울특별시</option>
                <option value="2">인천</option>
                <option value="3">대전광역시</option>
                <option value="4">대구광역시</option>
                <option value="5">광주광역시</option>
                <option value="6">부산광역시</option>
                <option value="7">울산광역시</option>
                <option value="31">경기도</option>
                <option value="32">강원도</option>
                <option value="33">충청북도</option>
                <option value="34">충청남도</option>
                <option value="35">경상북도</option>
                <option value="36">경상남도</option>
                <option value="37">전라북도</option>
                <option value="38">전라남도</option>
                <option value="39">제주도</option>
              </select>
            </div>
          </li>
          <li class="search-gugun-wrap">
            <p>구 / 군</p>
            <div>
              <span class="material-symbols-outlined"> location_city </span>
              <select class="search-gugun" @change="changeGugun">
                <option selected>구/군을 선택해주세요</option>
                <option
                  v-for="(item, index) in gugunlist"
                  :value="item.gugunCode"
                >
                  {{ item.gugunName }}
                </option>
              </select>
            </div>
          </li>
          <li class="search-type-wrap">
            <p>편의시설 유형</p>
            <div>
              <span class="material-symbols-outlined"> storefront </span>
              <select class="search-type" @change="changeContentType">
                <option selected>관광정보선택</option>
                <option value="12">관광지</option>
                <option value="14">문화시설</option>
                <option value="15">축제공연행사</option>
                <option value="25">여행코스</option>
                <option value="28">레포츠</option>
                <option value="32">숙박</option>
                <option value="38">쇼핑</option>
                <option value="39">음식점</option>
              </select>
            </div>
          </li>
          <li class="search-keyword-wrap">
            <p>검색어</p>
            <div>
              <span class="material-symbols-outlined"> search </span>
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                v-model="keyword"
              />
            </div>
          </li>
          <li class="search-btn-wrap">
            <button class="search-btn" @click="searchAttractions">검색</button>
          </li>
        </ul>
      </div>
    </div>

    <ul>
      <li></li>
    </ul>
  </div>
</template>

<style scoped>
.pagenation {
  margin-bottom: 30px;
}
.inner {
}
</style>
