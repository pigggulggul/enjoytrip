<script setup>
import "../assets/scss/2_pages/MyPage.scss";
import { userStore } from "@/stores/userPiniaStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const { VITE_VUE_API_URL } = import.meta.env;

const previewImages = ref([]);

const router = useRouter();
const ustore = userStore();
const password = ref("");
const password2 = ref("");
const email = ref("");
const user = {
  id: "",
  password: "",
  name: "",
  email: "",
};
const deleteflag = ref(false);

const upload = (event) => {
  console.log("upload 호출");
  console.log(event.target.files.length);
  previewImages.value = [];
  if (event.target.files.length > 1) {
    alert("사진은 최대 1개 까지 첨부가능합니다.");
  } else {
    //file째로(DTO-X 뷰에 찍히는 정보대로) 저장
    // files.value.fileInfos = event.target.files;
    for (const file of event.target.files) {
      //프리뷰
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  // 사용자가 올린 이미지
  console.log(event.target.files);
  // URL.createObjectURL로 사용자가 올린 이미지를 URL로 만들어서 화면에 표시할 수 있게 한다. img 태그의 src값에 바인딩해준다
  //   this.imageUploaded = URL.createObjectURL(this.image)
};

const modify = async () => {
  if (password.value.length == 0 || password2.value.length == 0) {
    alert("비밀번호를 입력해주세요");
    return;
  } else if (password.value != password2.value) {
    alert("비밀번호를 확인해주세요");
    return;
  } else if (password.value == password2.value) {
    user.id = ustore.userInfo.id;
    user.name = ustore.userInfo.name;
    user.password = password.value;
    user.email = email.value;
    // ustore.modifyUserInfo(user);
  }
  var inp = document.getElementById("upfile");
  if (inp.files.length > 1) {
    alert("1장만 첨부 가능합니다");
    return;
  }
  var data = new FormData();
  data.append("id", user.id);
  data.append("name", user.name);
  data.append("password", user.password);
  data.append("email", user.email);
  for (const file of inp.files) {
    data.append("files", file, file.name);
  }
  // console.log(data.get("userId"));
  // console.log(data.get("files"));

  // if (user.userId || user.userName || user.userPwd || user.emailId || user.emailDomain) {
  //     alert("빈칸없이 입력 해주세요");
  // } else if (user.value.userPwd != passwordCheck.value) {
  //     alert("비밀번호를 체크해 주세요");
  // } else {
  // await userModify(user.value);
  fetch(VITE_VUE_API_URL + "/users", {
    method: "PUT",
    body: data,
  })
    .then((response) => {
      let msg = "정보수정에 실패했습니다.";
      console.log(response);
      console.log(response.status);
      if (response.status == 200) msg = "정보수정이 완료되었습니다.";
      ustore.userLogout(user.id);
      alert(msg);
      console.log("modify 완료! ");
      router.push({ name: "login" });
    })
    .catch((error) => console.log(error));
};

async function getUser() {
  let token = sessionStorage.getItem("accessToken");
  await ustore.getUserInfo(token);
  if (ustore.userInfo == null) {
    alert("데이터가 없습니다.");
    router.push({ name: "home" });
  }
  email.value = ustore.userInfo.email;
}

const modifyUser = () => {
  if (password.value == password2.value) {
    user.id = ustore.userInfo.id;
    user.name = ustore.userInfo.name;
    user.password = password.value;
    user.email = email.value;
    ustore.modifyUserInfo(user);
  } else if (password.value != password2.value) {
    alert("비밀번호를 확인해주세요");
  }
};
const deleteUser = () => {
  ustore.deleteUser(ustore.userInfo.id);
};

const modifySection = () => {
  deleteflag.value = false;
};
const deleteSection = () => {
  deleteflag.value = true;
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <section class="mypage-modify-wrap">
    <div class="mypage-sub">
      <div class="mypage-img-wrap" v-if="ustore.userInfo.filePath">
        <img :src="VITE_VUE_API_URL + ustore.userInfo.filePath" />
        <label className="input-file-button" for="upfile">
          <span class="material-symbols-outlined"> add_a_photo </span>
        </label>
        <input
          type="file"
          id="upfile"
          multiple="multiple"
          accept="image/*, .gif"
          @change="upload"
          style="display: none"
        />
        <img
          class="change"
          v-for="(previewImage, index) in previewImages"
          :key="index"
          :src="previewImage"
        />
      </div>
      <div v-else class="mypage-img-wrap">
        <img src="@/assets/images/profile-standard.jpg" />
        <label className="input-file-button" for="upfile">
          <span class="material-symbols-outlined"> add_a_photo </span>
        </label>
        <input
          type="file"
          id="upfile"
          multiple="multiple"
          accept="image/*, .gif"
          @change="upload"
          style="display: none"
        />
        <img
          v-for="(previewImage, index) in previewImages"
          :key="index"
          :src="previewImage"
        />
      </div>
      <p class="profile-name">{{ ustore.userInfo.name }}</p>
      <h4 class="profile-id">{{ ustore.userInfo.id }}</h4>

      <div class="profile-modify" @click="modifySection">
        <span class="material-symbols-outlined"> account_circle </span>
        <p>회원 정보 수정</p>
      </div>
      <div class="profile-delete" @click="deleteSection">
        <span class="material-symbols-outlined"> delete </span>
        <p>회원 탈퇴하기</p>
      </div>
    </div>
    <div className="mypage_modify">
      <div v-if="!deleteflag">
        <h4 className="modify_title">회원 정보 조회 / 수정</h4>
        <div className="modify_content_wrap">
          <div className="modify_content_modify">
            <ul>
              <li>
                <p>비밀번호 변경</p>
                <input type="password" v-model="password" />
              </li>
              <li>
                <p>비밀번호 확인</p>
                <input type="password" v-model="password2" />
              </li>
              <li>
                <p>이메일 주소</p>
                <input type="text" v-model="email" />
              </li>
            </ul>
          </div>
        </div>
        <div className="btn btn-main center" @click="modify">
          <p>수정하기</p>
        </div>
      </div>
      <div v-if="deleteflag">
        <h4 className="modify_title">회원 탈퇴</h4>
        <p className="modify_little_title">회원을 탈퇴하시겠습니까?</p>
        <div className="btn btn-main center" @click="deleteUser">
          <p>탈퇴하기</p>
        </div>
      </div>
    </div>
  </section>
</template>
