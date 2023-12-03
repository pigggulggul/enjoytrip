<script setup>
import "@/assets/scss/4_components/BoardListItem.scss";
import { isLike, addLike, deleteLike, getFilePath } from "@/api/board";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/userPiniaStore";

const { VITE_VUE_API_URL } = import.meta.env;
const props = defineProps({ article: Object });
const emit = defineEmits(["getBoardList"]);
const imgSrc = ref("");

const onlyAuthUser = async () => {
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
const store = userStore();
const router = useRouter();
let checkUserInfo = null;

const sendLike = async () => {
  await onlyAuthUser();
  const LikeProp = ref({
    articleNo: props.article.articleNo,
    userId: checkUserInfo.id,
  });
  await isLike(LikeProp.value, async ({ data }) => {
    //true면 삭제
    console.log("좋아요 isLike 확인");
    console.log(data.isLike);
    if (data.isLike) {
      await deleteLike(LikeProp.value, () => {
        alert("삭제되었습니다.");
      });
    } else {
      await addLike(LikeProp.value, () => {
        alert("추가되었습니다.");
      });
    }
  });
  emit("getBoardList");
};

//이미지 랜덤
const bg = computed(() => {
  if (imgSrc.value === "") {
    const random = getRandom(1, 15);
    return `background-image: url(/src/assets/images/profile-standard${random}.jpg)`;
  } else {
    return `background-image: url(${imgSrc.value})`;
  }
});
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

onMounted(() => {
  getFilePath(props.article.userId, ({ data }) => {
    if (data.filePath !== null && data.filePath !== "") {
      imgSrc.value = VITE_VUE_API_URL + data.filePath;
    }
  });
});
</script>

<template>
  <section class="board-item-wrap">
    <div class="item-top-wrap">
      <div class="item-top-left">
        <div class="item-user-img" :style="bg"></div>
        <p class="item-user-name">
          {{ article.userName }}
        </p>
      </div>
      <div class="item-top-right">
        <router-link
          :to="{
            name: 'article-view',
            params: { articleno: article.articleNo },
          }"
          class="item-board-title"
          >{{ article.subject }}
        </router-link>

        <p class="item-board-content">
          {{ article.content }}
        </p>
      </div>
    </div>
    <div class="item-bottom-wrap">
      <div class="item-bottom-left">
        <div class="item-comment">
          <span class="material-symbols-outlined"> comment </span>
          <p>{{ article.comment }}</p>
        </div>
        <div class="item-liked" @click="sendLike">
          <span class="material-symbols-outlined"> favorite </span>
          <p>Liked {{ article.recommendation }}</p>
        </div>
        <div class="item-views">
          <span class="material-symbols-outlined"> visibility </span>
          <p>{{ article.hit }}</p>
        </div>
      </div>
      <div class="item-bottom-right">
        <span class="material-symbols-outlined"> more_horiz </span>
      </div>
    </div>
    <div class="article-number">{{ article.articleNo }}</div>
    <div class="item-time">
      {{ article.registerTime }}
    </div>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
