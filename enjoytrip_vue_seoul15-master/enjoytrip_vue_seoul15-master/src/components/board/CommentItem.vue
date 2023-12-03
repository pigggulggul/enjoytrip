<script setup>
import { ref, onMounted, computed } from "vue";
import { getFilePath, deleteComment } from "@/api/board";
import { userStore } from "@/stores/userPiniaStore";

const emit = defineEmits(["getArticle"]);

let checkUserInfo = null;
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
    if (checkUserInfo.id === props.item.userId) {
      visibleDel.value = true;
    }
  }
};

const { VITE_VUE_API_URL } = import.meta.env;

const props = defineProps(["item"]);
const imgSrc = ref("");
const visibleDel = ref(false);

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

const delComment = async () => {
  await deleteComment(
    props.item,
    () => {
      console.log("삭제되었습니다.");
      emit("getArticle");
    },
    () => {}
  );
};

onMounted(() => {
  getFilePath(props.item.userId, ({ data }) => {
    if (data.filePath !== null && data.filePath !== "") {
      imgSrc.value = VITE_VUE_API_URL + data.filePath;
    }
  });
  onlyAuthUser();
});
</script>

<template>
  <div>
    <section class="board-detail-wrap">
      <div class="item-top-wrap">
        <div class="item-top-left">
          <div class="item-user-img" :style="bg"></div>
          <p class="item-user-name">
            {{ props.item.userId }}
          </p>
        </div>
        <div class="item-top-right">
          <p class="item-board-content">
            {{ props.item.content }}
          </p>
        </div>
      </div>
    </section>
    <p class="comment-date" style="position: absolute; right: 20px; top: 20px">
      {{ props.item.date }}
    </p>
    <div class="btn btn-red" @click="delComment" v-if="visibleDel">
      삭제하기
    </div>
  </div>
</template>

<style scoped>
.btn-red {
  color: red;
  border: 1px solid red;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.btn-red:hover {
  background-color: red;
  color: white;
}
</style>
