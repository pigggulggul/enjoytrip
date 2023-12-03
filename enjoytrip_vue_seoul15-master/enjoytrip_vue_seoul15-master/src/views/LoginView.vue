<script setup>
import "../assets/scss/2_pages/LoginPage.scss";
import { onMounted, reactive } from "vue";
import { userStore } from "@/stores/userPiniaStore";
import { useRouter } from "vue-router";
const router = useRouter();
const ustore = userStore();
const click = reactive({
  rememeberId: false,
});
const user = reactive({
  id: "",
  password: "",
});
const error = reactive({
  message: "",
});
function updateData(data, key) {
  console.log(click);
  user[key] = data;
  console.log(user);
}
//쿠키에서 저장된 아이디가 있으면 가져오는 함수
async function getIDByCookie() {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  console.log(cookieArray);
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split("=");
    const key = cookie[0];
    const value = cookie[1];

    if (key === "id") {
      user.id = value;
    }
  }
}

//아이디를 쿠키에 저장하는 함수
async function storeIDByCookie(id) {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  document.cookie = `id=${id}`;
}

async function signIn() {
  console.log(user);
  await ustore.userLogin(user);
  let token = sessionStorage.getItem("accessToken");
  console.log("1. confirm() token >> " + token);
  if (ustore.isLogin) {
    // 여기는 state commit 변경 사항이 잘 적용되는데..
    await ustore.getUserInfo(token);
    // await this.getUserInfo(token);
    console.log("4. confirm() userInfo :: ", ustore.userInfo);
    if (ustore.userInfo.isAdmin) {
      console.log(ustore.userInfo.id + +"관리자님 환영합니다!");
    } else {
      console.log(ustore.userInfo.id + +"님 환영합니다!");
      // alert(store.state.userStore.userInfo.id + "님 환영합니다!");
    }
    if (click.rememeberId) {
      // 아이디 저장 필요함
      await storeIDByCookie(user.id);
      await getIDByCookie();
    }
    router.push({ name: "home" }); // 메인 페이지로 이동
  } else {
    error.message = "아이디 또는 비밀번호가 잘못되었습니다.";
  }
}

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <section className="loginpage">
    <div class="login-wrap">
      <h4 className="logintitle">로그인</h4>
      <input
        className="logininput"
        type="text"
        id="floatingInput"
        placeholder="아이디를 입력해주세요."
        v-model="user.id"
      />
      <input
        className="logininput"
        type="password"
        id="floatingPassword"
        placeholder="비밀번호를 입력해주세요"
        v-model="user.password"
      />
      <div
        className="btn btn-main reverse radius10"
        type="submit"
        @click="signIn()"
      >
        <p>로그인</p>
      </div>
      <div className="etcfunction">
        <p className="findId">아이디 찾기</p>
        /
        <p className="findPw">비밀번호 찾기</p>
        /
        <p className="findAccount">
          <RouterLink to="/signup">회원가입</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
