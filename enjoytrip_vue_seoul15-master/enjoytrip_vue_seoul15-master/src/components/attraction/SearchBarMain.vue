<script setup>
import { ref, onMounted } from "vue";
import "@/assets/scss/4_components/SearchBarMain.scss";
import { postAttraction, getGugun } from "../../api/attraction";
import { useRouter } from "vue-router";

const router = useRouter();

const contentTypeId = ref(0);
const sidoCode = ref(0);
const gugunCode = ref(0);
const size = ref(10);
const keyword = ref("");
const pgno = ref(1);
const gugunlist = ref();

const searchSample = ref({
  contentTypeId: contentTypeId,
  gugunCode: gugunCode,
  keyword: keyword,
  sidoCode: sidoCode,
  size: size,
  pgno: pgno,
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
  console.log(searchSample.value);
  postAttraction(searchSample).then((res) => {
    attractionlist.value = res;
    const attlist = attractionlist.value.attractions;
    const attcount = attractionlist.value.currentPage;
    const totalP = attractionlist.value.totalPageCount;
    console.log(attlist);
    console.log(attcount);
    console.log(totalP);
    console.log(attractionlist.value);
    router.push({
      name: "attraction-list",
      state: {
        attractions: attlist,
        currentPage: attcount,
        totalPageCount: totalP,
      },
    });
  });
};
</script>

<template>
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
            <option v-for="(item, index) in gugunlist" :value="item.gugunCode">
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
</template>

<style scoped></style>
