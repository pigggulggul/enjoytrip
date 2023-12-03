<script setup>
import "../assets/scss/2_pages/SignUpPage.scss";
import { RouterLink, RouterView } from "vue-router";
import { ref, computed } from "vue";
import { userStore } from "@/stores/userPiniaStore";
import { useRouter } from "vue-router";
import { joinUser } from "@/api/member";
const router = useRouter();
const ustore = userStore();

const acId = ref("");
const acPw = ref("");
const acPw2 = ref("");
const acName = ref("");
const acEmail = ref("");
const acDomain = ref("");
const plusMail = computed(() => {
  return acEmail.value + "@" + acDomain.value;
});
const accountType = ref({
  id: acId,
  password: acPw,
  name: acName,
  email: plusMail,
});

const asyncSignUp = async (user) => {
  await joinUser(
    user,
    ({ data }) => {
      console.log(data);
      router.push({ name: "home" });
    },
    (error) => {
      console.log(error);
    }
  );
};

async function signup() {
  if (
    acId.value.length >= 4 &&
    acId.value.length <= 20 &&
    acPw.value.length >= 4 &&
    acPw.value.length <= 20 &&
    acName.value.length != 0 &&
    acEmail.value.length != 0 &&
    acDomain.value.length != 0
  ) {
    if (acPw.value != acPw2.value) {
      alert("비밀번호를 확인해주세요");
    } else {
      asyncSignUp(accountType);
    }
  } else {
    alert("형식에 맞게 입력해주세요");
  }
}
</script>

<template>
  <section className="accountpage">
    <div class="signup-img"></div>
    <div class="signup-wrap">
      <h4 className="title">회원가입</h4>
      <div className="titlewrap">
        <p className="accounttitle">아이디</p>
        <!-- <p className="titlered">사용 할 수 없는 아이디입니다.</p> -->
      </div>
      <input
        className="accountinput"
        type="text"
        placeholder="아이디 입력 (4~20자)"
        v-model="acId"
      />
      <div className="titlewrap">
        <p className="accounttitle">비밀번호 입력</p>
        <!-- <p className="titlered">20자 이내의 비밀번호를 입력해주세요.</p> -->
      </div>
      <input
        className="accountinput"
        type="password"
        placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 12~20자)"
        v-model="acPw"
      />
      <div className="titlewrap">
        <p className="accounttitle">비밀번호 확인</p>
        <!-- <p className="titlered">비밀번호가 일치하지 않습니다.</p> -->
      </div>
      <input
        className="accountinput"
        type="password"
        placeholder="비밀번호 재입력"
        v-model="acPw2"
      />
      <p className="accounttitle">이름</p>
      <input
        className="accountinput"
        type="text"
        placeholder="이름을 입력해주세요"
        v-model="acName"
      />

      <p className="accounttitle">이메일 주소</p>
      <div className="emailwrap">
        <input
          className="accountinput"
          type="text"
          placeholder="이메일 주소"
          v-model="acEmail"
        />
        <p>@</p>
        <input
          className="accountinput"
          type="text"
          placeholder="ex : naver.com"
          v-model="acDomain"
        />
      </div>
      <div class="select-wrap">
        <div className="btn btn-main" @click="signup">가입하기</div>
        <div className="btn btn-main">
          <RouterLink to="/">취소하기</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.select-wrap {
  display: flex;
  margin: 20px auto;
}
.select-wrap > div {
  margin: 0 20px;
}
</style>
