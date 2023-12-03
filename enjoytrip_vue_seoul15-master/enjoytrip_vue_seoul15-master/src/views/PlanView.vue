<script setup>
import "@/assets/scss/2_pages/PlanView.scss";
import RouteCard from "@/components/plan/routeCard.vue";
import { onMounted, ref, computed } from "vue";
import {
  getAttraction,
  postAttraction,
  postAttractionCount,
  getGugun,
} from "@/api/attraction";
import { plusPlan, getPlans, deletePlan } from "@/api/plan";
import { addTrip, getTrip, modifyTrip, deleteTrip } from "@/api/mytirp";
import { useRouter } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import AttractionDetailMap from "@/components/attraction/AttractionDetailMap.vue";
import { userStore } from "@/stores/userPiniaStore";
import RouteAttCard from "@/components/plan/routeAttCard.vue";
import PlanRouteMap from "@/components/plan/PlanRouteMap.vue";
import imgSrc from "@/assets/images/noimage.png";

//이미지 오류
function replaceByDefault(e) {
  e.target.src = imgSrc;
}

//자격증명
const onlyAuthUser = async () => {
  const store = userStore();
  checkUserInfo = null;
  const checkToken = store.isValidToken;
  let token = sessionStorage.getItem("accessToken");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.getUserInfo(token);
    checkUserInfo = store.userInfo;
    console.log(checkUserInfo.id);
  }
  if (!checkToken || checkUserInfo === null) {
    store.isLogin = false;
    alert("로그인해주시길 바랍니다.");
    router.push({ name: "login" });
  } else {
    console.log("이상없다!!!!!!!!.");
  }
};

const mainflag = ref(true);
const addflag = ref(false);
const routeflag = ref(false);
const detailflag = ref(false);
const makeMapFlag = ref(false);
const newPlanName = ref("");
const router = useRouter();
const routeArrflag = ref(false);
const routeAttArr = ref([]);
const unSelectAtt = ref([]);
const SelectAtt = ref([]);

const RouteMake = ref(false);
const ShowRoute = ref(false);

let taxi, road, length, time;

const routeTaxi = (data) => {
  console.log(data);
  taxi = data;
};
const routeRoad = (data) => {
  console.log(data);
  road = data;
};
const routeLength = (data) => {
  console.log(data);
  length = data;
};
const routeTime = (data) => {
  console.log(data);
  time = data;
};

const tabRouteMake = () => {
  RouteMake.value = true;
  ShowRoute.value = false;
};

const tabShowRoute = () => {
  RouteMake.value = false;
  ShowRoute.value = true;
};

const makeRouteSelect = () => {
  console.log("Select 나누기 시작");
  unSelectAtt.value = [];
  SelectAtt.value = [];
  routeAttArr.value.forEach((element) => {
    if (element.routeNum == 0) {
      unSelectAtt.value.push(element);
    } else {
      SelectAtt.value.push(element);
    }
  });
  SelectAtt.value = SelectAtt.value.sort((s1, s2) => s1.routeNum - s2.routeNum);
};
const changeUnSelect = (index) => {
  unSelectAtt.value.push(SelectAtt.value[index]);
  SelectAtt.value.splice(index, 1);
  console.log(SelectAtt.value);
};
const changeSelect = (index) => {
  SelectAtt.value.push(unSelectAtt.value[index]);
  unSelectAtt.value.splice(index, 1);
  console.log(unSelectAtt.value);
};
async function saveRoute() {
  const plan = [];
  SelectAtt.value.forEach((element, index) => {
    plan.push({
      contentId: element.contentId,
      no: element.no,
      planNo: element.planNo,
      routeNum: index + 1,
    });
  });
  unSelectAtt.value.forEach((element, index) => {
    plan.push({
      contentId: element.contentId,
      no: element.no,
      planNo: element.planNo,
      routeNum: 0,
    });
  });
  console.log(plan);
  await modifyTrip(plan, () => {
    alert("루트가 저장되었습니다.");
  });
}
async function makeRoute() {
  makeMapFlag.value = false;
  await onlyAuthUser();
  const plan = [];
  SelectAtt.value.forEach((element, index) => {
    plan.push({
      contentId: element.contentId,
      no: element.no,
      planNo: element.planNo,
      routeNum: index + 1,
    });
  });
  unSelectAtt.value.forEach((element, index) => {
    plan.push({
      contentId: element.contentId,
      no: element.no,
      planNo: element.planNo,
      routeNum: 0,
    });
  });
  console.log(plan);
  await modifyTrip(plan, () => {});
  await getTrip(selectPlan, (res) => {
    console.log("선택한 계획 데이터");
    console.log(res.data);
    mainflag.value = false;
    routeArrflag.value = true;
    routeAttArr.value = res.data;
    console.log("경로 만들기");
    makeRouteSelect();
    console.log(unSelectAtt.value);
    console.log(SelectAtt.value);
  });
  makeMapFlag.value = true;
}

//유저 아이디
let checkUserInfo = null;

const changeMain = () => {
  mainflag.value = true;
  addflag.value = false;
  routeflag.value = false;
  routeArrflag.value = false;
  getRoute();
};
async function changeAdd() {
  console.log("새로운 이름");
  console.log(newPlanName.value);
  if (newPlanName.value.length == 0) {
    alert("최소 한 글자 이상을 입력해주세요");
    router.removeRoute("/");
    return;
  }
  mainflag.value = false;
  addflag.value = true;
  routeflag.value = false;
  //여행지 추가 버튼을 누르면 addroute로 여행지 추가 후 getRoute() 다시 작동
  await onlyAuthUser();
  console.log(checkUserInfo.id);
  await plusPlan(
    { name: newPlanName.value, userId: checkUserInfo.id },
    (res) => {
      console.log("새로운 계획이 추가되었습니다");
      console.log(res);
    }
  );
  detailflag.value = false;
  showAttDetail.value = {
    firstImage: "",
    title: "",
    overview: "",
    addr1: "",
    tel: "",
  };
  newPlanName.value = "";
}

async function getRoute() {
  //이 부분에 루트를 받아오는 axios 작동
  await onlyAuthUser();
  console.log(checkUserInfo.id);
  await getPlans(checkUserInfo.id, (res) => {
    arrayRoute.value = res.data;
    console.log(arrayRoute.value);
  });
}
const arrayRoute = ref();

//루트 추가하기, 가져오기
let selectPlan;
async function showRoute(...args) {
  selectPlan = args[1];
  console.log("showRoute 현재 선택한 경로 : " + selectPlan);
  await onlyAuthUser();
  await getTrip(selectPlan, (res) => {
    console.log("선택한 계획 데이터");
    console.log(res.data);
    mainflag.value = false;
    routeArrflag.value = true;
    RouteMake.value = true;
    routeAttArr.value = res.data;
    console.log(routeAttArr.value);
    console.log("구역 나누기");
    makeRouteSelect();
    console.log(unSelectAtt.value);
    console.log(SelectAtt.value);
  });
}

const addRoute = (...args) => {
  selectPlan = args[1];
  detailflag.value = false;
  mainflag.value = false;
  routeflag.value = false;
  addflag.value = true;
};
async function addAttr(contentId) {
  await onlyAuthUser();
  const addAttrParam = {
    contentId: contentId,
    planNo: selectPlan,
  };
  console.log(addAttrParam);
  await addTrip(addAttrParam, () => {
    alert("추가되었습니다");
  });
}
async function deleteP(planId) {
  await onlyAuthUser();
  await deletePlan(planId, () => {});
  await getRoute();
}
async function deleteT(tripId) {
  await onlyAuthUser();
  await deleteTrip(tripId, () => {});
  await makeRoute();
}

// ------------관광지 검색부분-------------
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
const showAttDetail = ref({
  firstImage: "",
  title: "",
  overview: "",
  addr1: "",
  tel: "",
});
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
  });
};

async function getAttractionDetail(contentid) {
  console.log(contentid + "번 관광지 얻으러 가자!!!");
  await getAttraction(
    contentid,
    ({ data }) => {
      detailflag.value = true;
      showAttDetail.value = data;
      console.log(showAttDetail.value);
    },
    (error) => {
      console.log(error);
    }
  );
}

// ------------관광지 검색부분-------------

onMounted(() => {
  getRoute();
});
</script>

<template>
  <section class="plan">
    <div class="plan-left-wrap">
      <!-- 시작화면 -->
      <div class="left-main-section" v-if="mainflag">
        <div class="plan-new">
          <input
            type="text"
            placeholder="새 이름을 입력해주세요."
            v-model="newPlanName"
          />
          <div class="btn btn-main" @click="changeAdd">여행지 추가</div>
        </div>
        <h5 class="plan-left-title">내가 작성한 여행 계획</h5>
        <!-- 루트 가지고오기 -->
        <ul class="plan-left-ul-wrap">
          <li class="plan-left-li-wrap" v-for="(item, index) in arrayRoute">
            <RouteCard
              @add-no-attr="addRoute"
              @click-show-route="showRoute"
              @delete-plan="deleteP"
              :name="item.name"
              :index="index"
              :planNo="item.planNo"
            ></RouteCard>
          </li>
        </ul>
      </div>
      <!-- 추가화면 -->
      <div class="left-main-section" v-if="addflag">
        <div class="plan-new">
          <div class="btn btn-main" @click="changeMain">되돌아가기</div>
        </div>
        <h5 class="plan-left-title">추가할 여행 계획</h5>
        <ul class="plan-att-card">
          <li
            class="plan-att-item"
            @click="getAttractionDetail(item.contentId)"
            v-for="(item, index) in attractionlist.attractions"
          >
            <div class="plan-att-left">
              <img
                class="plan-att-img"
                :src="item.firstImage"
                alt=""
                @error="replaceByDefault"
              />
            </div>
            <div class="plan-att-right">
              <h4 class="plan-att-addr">{{ item.addr1 }}</h4>
              <h3 class="plan-att-title">{{ item.title }}</h3>
              <div class="plan-btn-wrap">
                <div
                  class="plan-att-btn btn btn-main reverse"
                  @click="addAttr(item.contentId)"
                >
                  추가하기
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 계획 선택 -->
      <div class="left-main-section" v-if="routeArrflag">
        <div class="plan-new">
          <div class="btn btn-main" @click="changeMain">되돌아가기</div>
        </div>
        <hr />
        <h5 class="plan-left-title">내가 추가한 계획</h5>
        <!-- 선택한 계획 목록 -->
        <ul class="plan-left-ul-wrap">
          <li class="plan-left-li-wrap" v-for="(item, index) in routeAttArr">
            <RouteAttCard
              :title="item.title"
              :firstImage="item.firstImage"
              :contentTypeId="item.contentTypeId"
              :latitude="item.latitude"
              :longitude="item.longitude"
              :no="item.no"
              @delete-trip="deleteT"
            ></RouteAttCard>
          </li>
        </ul>
      </div>
    </div>
    <div class="plan-right-wrap">
      <div class="plan-right-main" v-if="mainflag">
        <div class="right-main-wrap">
          <h4 class="right-main-title">
            이곳은 여행을 계획하고 등록하는 페이지 입니다.
          </h4>
          <p class="right-main-content">
            자신만의 루트를 만들어 계획을 등록해보세요
          </p>
        </div>
      </div>
      <div class="plan-right-main" v-if="addflag">
        <section class="plan-detail-att" v-if="detailflag">
          <div class="plan-detail-att-wrap">
            <div class="att-detail-top-wrap">
              <img :src="showAttDetail.firstImage" />
              <AttractionDetailMap
                class="att-map"
                :attraction-detail="showAttDetail"
              />
            </div>

            <h1>{{ showAttDetail.title }}</h1>

            <h2>About</h2>
            <p>{{ showAttDetail.overview }}</p>

            <ul>
              <li>문의 및 안내 : {{ showAttDetail.tel }}</li>
              <li>주소 : {{ showAttDetail.addr1 }}</li>
            </ul>
            <div class="btn btn-main" @click="addAttr(showAttDetail.contentId)">
              추가하기
            </div>
          </div>
        </section>
      </div>
      <div class="plan-right-main" v-if="routeArrflag">
        <div class="map-wrap">
          <PlanRouteMap
            class="map"
            :attractions="SelectAtt"
            :makeMapFlag="makeMapFlag"
            @routeTaxi="routeTaxi"
            @routeRoad="routeRoad"
            @routeLength="routeLength"
            @routeTime="routeTime"
          ></PlanRouteMap>
        </div>
      </div>

      <div class="plan-right-sub" v-if="addflag">
        <div class="right-sub-section">
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
              <button class="search-btn" @click="searchAttractions">
                검색
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="plan-right-sub" v-if="routeArrflag">
        <ul class="plan-route-tab">
          <li @click="tabRouteMake">여행 계획 짜기</li>
          <li @click="tabShowRoute">경로보기</li>
        </ul>
        <div class="right-sub-section" v-if="RouteMake">
          <ul class="route-selected-wrap">
            <p>선택된 경로 :</p>
            <li
              class="route-selected-item"
              v-for="(item, index) in SelectAtt"
              :key="index"
              @click="changeUnSelect(index)"
            >
              <span>{{ index + 1 }} . </span>
              {{ item.title }}
            </li>
          </ul>
          <ul class="route-unselected-wrap">
            <P>선택하지 않은 경로 :</P>
            <li
              class="route-unselected-item"
              v-for="(item, index) in unSelectAtt"
              :key="index"
              @click="changeSelect(index)"
            >
              <span>{{ index + 1 }} . </span>
              {{ item.title }}
            </li>
          </ul>
          <div class="route-btn-wrap">
            <div class="btn btn-black" @click="saveRoute">경로 저장</div>
            <div class="btn btn-black" @click="makeRoute">경로 만들기</div>
          </div>
        </div>
        <div class="right-sub-section" v-if="ShowRoute">
          <div class="show-dir-pay">
            <p>택시 요금 : {{ taxi }}</p>
            <p>통행 요금 : {{ road }}</p>
            <p>총 거리 : {{ length }}</p>
            <p>목적지까지 소요시간 : {{ time }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
