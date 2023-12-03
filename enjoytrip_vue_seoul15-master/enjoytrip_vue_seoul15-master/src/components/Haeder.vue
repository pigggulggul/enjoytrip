<script setup>
import { RouterLink, RouterView } from "vue-router";
import "../assets/scss/1_layouts/header.scss";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { userStore } from "@/stores/userPiniaStore";
import { useRouter } from "vue-router";

// const scrollNum = ref(0);
// const scrollHeader = ref("");
// const scrollEvt = () => {
//   scrollNum.value = window.scrollY;
//   console.log(scrollNum.value);
//   if (window.scrollY > 300) {
//     scrollHeader.value = "scroll";
//   } else {
//     scrollHeader.value = "";
//   }
// };

const router = useRouter();
const ustore = userStore();
const isLogin = computed(() => ustore.isLogin);
const toggle = ref(false);

const changeToggle = () => {
  toggle.value = !toggle.value;
  console.log(toggle.value);
};

console.log("---------------------->", isLogin);

async function logout() {
  console.log("로그아웃 -> " + ustore.userInfo.id);
  await ustore.userLogout(ustore.userInfo.id);
  router.push({ name: "home" }); // 메인 페이지로 이동
}

onMounted(() => {
  // document.addEventListener("scroll", scrollEvt);
});
</script>
<template>
  <header>
    <div class="header-left" v-if="!toggle">
      <RouterLink class="logo" to="/"><div></div></RouterLink>
      <h1>
        <RouterLink to="/">HansooTrip</RouterLink>
      </h1>
    </div>
    <ul class="header-right" v-if="!toggle">
      <li class="item">
        <span class="material-symbols-outlined"> home </span>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li class="item">
        <span class="material-symbols-outlined"> flight_takeoff </span>
        <RouterLink to="/attraction">Attraction</RouterLink>
      </li>
      <li class="item" v-if="isLogin">
        <span class="material-symbols-outlined"> assistant_navigation </span>
        <RouterLink to="/plan">Plan</RouterLink>
      </li>
      <li class="item">
        <span class="material-symbols-outlined"> toolbar </span
        ><RouterLink to="/board">Board</RouterLink>
      </li>
      <li class="item" v-if="isLogin">
        <span class="material-symbols-outlined"> settings_heart </span>
        <RouterLink to="/mypage">MyPage</RouterLink>
      </li>
      <li class="item" v-if="!isLogin">
        <span class="material-symbols-outlined"> login </span>
        <RouterLink to="/login">Login</RouterLink>
      </li>
      <li class="item" v-if="isLogin" @click="logout()">
        <span class="material-symbols-outlined"> logout </span
        ><RouterLink to="/">Logout</RouterLink>
      </li>
    </ul>
    <span
      class="openToggle material-symbols-outlined"
      @click="changeToggle"
      v-if="toggle"
    >
      menu
    </span>
    <span
      class="closeToggle material-symbols-outlined"
      @click="changeToggle"
      v-if="!toggle"
    >
      close
    </span>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
}
ul {
  margin: 0;
}
</style>
