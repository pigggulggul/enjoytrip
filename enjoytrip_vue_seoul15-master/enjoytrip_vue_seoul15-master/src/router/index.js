import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MyPage from "../views/MyPage.vue";
import AttractionView from "../views/AttractionView.vue";
import Plan from "../views/PlanView.vue";
import SignUpPage from "../views/SignUpPage.vue";
import { userStore } from "@/stores/userPiniaStore";

const onlyAuthUser = async (to, from, next) => {
  const store = userStore();
  let checkUserInfo = null;
  const checkToken = store.isValidToken;
  let token = sessionStorage.getItem("accessToken");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.getUserInfo(token);
    checkUserInfo = store.userInfo;
  }
  if (!checkToken || checkUserInfo === null) {
    //store.commit("userStore/SET_IS_LOGIN", false);
    store.isLogin = false;
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/attraction",
      name: "attraction",
      beforeEnter: onlyAuthUser,
      component: AttractionView,
      redirect: { name: "attraction-list" },
      children: [
        {
          path: "list",
          name: "attraction-list",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/attraction/AttractionList.vue"),
        },
        {
          path: "detail/:contentid",
          name: "attraction-detail",
          beforeEnter: onlyAuthUser,
          component: () =>
            import("@/components/attraction/AttractionDetail.vue"),
        },
      ],
    },
    {
      path: "/plan",
      name: "plan",
      beforeEnter: onlyAuthUser,
      component: Plan,
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthUser,
      component: MyPage,
    },
    {
      path: "/signup",
      name: "siunup",
      component: SignUpPage,
    },

    {
      path: "/board",
      name: "board",
      beforeEnter: onlyAuthUser,
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
  ],
});

export default router;
