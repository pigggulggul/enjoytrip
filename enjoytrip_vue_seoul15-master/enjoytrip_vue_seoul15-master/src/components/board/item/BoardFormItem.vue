<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, getModifyArticle, modifyArticle } from "@/api/board";
import { userStore } from "@/stores/userPiniaStore";
import "../../../assets/scss/4_components/BoardFormItem.scss";

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const article = ref({
  articleNo: 0,
  subject: "",
  content: "",
  userId: "",
  userName: "",
  hit: 0,
  registerTime: "",
});

const onlyAuthUser = async () => {
  const store = userStore();
  let checkUserInfo = null;
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
    article.value.userId = checkUserInfo.id;
    isUseId.value = true;
  }
};

onMounted(() => {
  onlyAuthUser();
});

if (props.type === "modify") {
  let { articleno } = route.params;
  console.log(articleno + "번글 얻어와서 수정할거야");
  getModifyArticle(
    articleno,
    ({ data }) => {
      article.value = data;
      isUseId.value = true;
    },
    (error) => {
      console.log(error);
    }
  );
  isUseId.value = true;
}

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.subject,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 30) {
      subjectErrMsg.value = "제목을 확인해 주세요!!!";
    } else subjectErrMsg.value = "";
  },
  { immediate: true }
);
watch(
  () => article.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

function onSubmit() {
  // event.preventDefault();

  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

function writeArticle() {
  console.log("글등록하자!!", article.value);
  registArticle(
    article.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

function updateArticle() {
  console.log(article.value.articleNo + "번글 수정하자!!", article.value);
  modifyArticle(
    article.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

function moveList() {
  router.push({ name: "article-list" });
}
</script>

<template>
  <form class="board-write-wrap" @submit.prevent="onSubmit">
    <div>
      <div class="board-write-id-wrap">
        <input
          type="text"
          class="form-control"
          v-model="article.userId"
          :disabled="isUseId"
          placeholder="아이디를 입력해주세요"
        />
      </div>
      <div class="board-write-title-wrap">
        <input
          type="text"
          class="form-control"
          v-model="article.subject"
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div class="board-write-content-wrap">
        <textarea
          class="form-control"
          v-model="article.content"
          rows="10"
        ></textarea>
      </div>
      <div class="board-write-btn-wrap">
        <button type="submit" class="btn btn-main" v-if="type === 'regist'">
          글작성
        </button>
        <button type="submit" class="btn btn-main" v-else>글수정</button>
        <button type="button" class="btn btn-main reverse" @click="moveList">
          돌아가기
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
