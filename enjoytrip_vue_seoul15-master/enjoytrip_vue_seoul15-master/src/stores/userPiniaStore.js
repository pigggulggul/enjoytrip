import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { httpStatusCode } from "@/util/http-status";
//option =>  setup으로 수정하세요
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  modify,
  remove,
} from "@/api/member";
//npm i pinia-plugin-persistedstate --force
export const userStore = defineStore(
  "userPiniaStore",
  () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);

    const userLogin = async (loginUser) => {
      await login(
        loginUser,
        (response) => {
          // console.log("login ok!!!!", response.status);
          // console.log("login ok!!!!", httpStatusCode.CREATE);
          if (response.status === httpStatusCode.CREATE) {
            let { data } = response;
            // console.log("data", data);
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            isLogin.value = true;
            isLoginError.value = false;
            isValidToken.value = true;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            console.log("sessiontStorage에 담았다", isLogin.value);
          } else {
            console.log("로그인 실패했다");
            isLogin.value = false;
            isLoginError.value = true;
            isValidToken.value = false;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const getUserInfo = async (token) => {
      let decodeToken = jwtDecode(token);
      console.log("2. decodeToken", decodeToken);
      await findById(
        decodeToken.userId,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            userInfo.value = response.data;
            console.log("3. getUserInfo data >> ", response.data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.error(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          isValidToken.value = false;

          await tokenRegenerate();
        }
      );
    };

    const tokenRegenerate = async () => {
      console.log(
        "토큰 재발급 >> 기존 토큰 정보 : {}",
        sessionStorage.getItem("accessToken")
      );
      await tokenRegeneration(
        JSON.stringify(userInfo.value),
        (response) => {
          if (response.status === httpStatusCode.CREATE) {
            let accessToken = response.data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("accessToken", accessToken);
            isValidToken.value = true;
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === httpStatusCode.UNAUTHORIZED) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              userInfo.value.userid,
              (response) => {
                if (response.status === httpStatusCode.OK) {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                isLogin.value = false;
                userInfo.value = null;
                isValidToken.value = false;
                router.push({ name: "user-login" });
              },
              (error) => {
                console.error(error);
                isLogin.value = false;
                userInfo.value = null;
              }
            );
          }
        }
      );
    };

    const userLogout = async (userid) => {
      await logout(
        userid,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
          } else {
            console.error("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    };

    const modifyUserInfo = async (user) => {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      await modify(
        user,
        async (response) => {
          if (response.status === httpStatusCode.OK) {
            await userLogout(user.id);
            alert("수정이 완료되었습니다.");
            router.push({ name: "login" });
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error
          );
          isValidToken.value = false;
          tokenRegeneration();
        }
      );
    };
    const deleteUser = async (userid) => {
      // let decodeToken = jwtDecode(token);
      console.log("삭제시작");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(userid);
      await remove(
        userid,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
            router.push({ name: "home" });
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error
          );
          isValidToken.value = false;
          tokenRegeneration();
        }
      );
    };

    return {
      isLogin,
      isLoginError,
      userInfo,
      isValidToken,
      userLogin,
      getUserInfo,
      tokenRegenerate,
      userLogout,
      modifyUserInfo,
      deleteUser,
    };
  },
  { persist: true }
);
