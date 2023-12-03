<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  detailArticle,
  deleteArticle,
  getComment,
  addComment,
  isLike,
  addLike,
  deleteLike,
  detailArticleNoUpdate,
  getFilePath,
} from "@/api/board";
import "@/assets/scss/2_pages/BoardDetail.scss";
import { userStore } from "@/stores/userPiniaStore";
import CommentItem from "./CommentItem.vue";

const { VITE_VUE_API_URL } = import.meta.env;
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
  console.log(article);
};
const store = userStore();
const route = useRoute();
const router = useRouter();
const commentData = ref([]);
let checkUserInfo = null;
const isUserFlag = ref(false);
const textContent = ref("");
const showCommentFlag = ref(false);
const imgSrc = ref("");

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});

onMounted(() => {
  getArticle();
});
const showComment = () => {
  showCommentFlag.value = !showCommentFlag.value;
};
const getArticle = async () => {
  // const { articleno } = route.params;
  console.log(articleno + "번글 얻으러 가자!!!");
  await onlyAuthUser();
  await detailArticle(
    articleno,
    ({ data }) => {
      console.log(data.userId);
      console.log(checkUserInfo.id);
      if (data.userId == checkUserInfo.id) {
        isUserFlag.value = true;
      } else {
        isUserFlag.value = false;
      }
      article.value = data;
      console.log(article.value);
      getFilePath(article.value.userId, ({ data }) => {
        if (data.filePath !== null && data.filePath !== "") {
          imgSrc.value = VITE_VUE_API_URL + data.filePath;
        }
      });
    },
    (error) => {
      console.log(error);
    }
  );
  await getComment(
    articleno,
    ({ data }) => {
      commentData.value = data;
      console.log(commentData.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  router.push({ name: "article-modify", params: { articleno } });
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + "번글 삭제하러 가자!!!");
  deleteArticle(
    articleno,
    (response) => {
      if (response.status == 200) moveList();
    },
    (error) => {
      console.log(error);
    }
  );
}

async function submitComment() {
  if (textContent.value.length == 0) {
    alert("글을 작성해주세요");
    return;
  }
  await onlyAuthUser();
  const postComment = {
    articleNo: article.value.articleNo,
    content: textContent.value,
    userId: checkUserInfo.id,
  };
  await addComment(
    postComment,
    () => {
      alert("댓글이 작성되었습니다.");
      textContent.value = "";
    },
    () => {
      console.log("작성이 실패되었습니다.");
      return;
    }
  );
  await getArticle();
}

const sendLike = async () => {
  await onlyAuthUser();
  const LikeProp = ref({
    articleNo: articleno,
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
  await detailArticleNoUpdate(
    articleno,
    ({ data }) => {
      article.value = data;
      console.log(article.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

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
</script>

<template>
  <div class="container">
    <section class="board-detail-wrap border">
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
          <div class="item-comment" @click="showComment">
            <span class="material-symbols-outlined"> comment </span>
            <p>댓글보기 ({{ article.comment }})</p>
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
          <button type="button" class="btn btn-main reverse" @click="moveList">
            글목록
          </button>
          <button
            type="button"
            class="btn btn-black"
            @click="moveModify"
            v-if="isUserFlag"
          >
            글수정
          </button>
          <button
            type="button"
            class="btn btn-sub"
            @click="onDeleteArticle"
            v-if="isUserFlag"
          >
            글삭제
          </button>
        </div>
      </div>
      <div class="item-time">
        {{ article.registerTime }}
      </div>
    </section>
    <section class="comment-section" v-if="showCommentFlag">
      <ul>
        <li class="comment-wrap" v-for="(item, index) in commentData">
          <CommentItem :item="item" @getArticle="getArticle"> </CommentItem>
        </li>
      </ul>
    </section>
    <section class="comment-submit">
      <h3 class="comment-submit-title">댓글쓰기</h3>
      <textarea v-model="textContent" cols="30" rows="10"> </textarea>
      <div class="btn btn-main" @click="submitComment">댓글 작성</div>
    </section>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.comment-section {
  width: 60%;
}
.comment-wrap {
  position: relative;
  border: 1px solid #bbb;
  padding: 20px 0;
  margin: 20px 0;
  border-radius: 10px;
}
.comment-date {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
