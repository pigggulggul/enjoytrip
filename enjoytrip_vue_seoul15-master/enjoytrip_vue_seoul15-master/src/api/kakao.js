import { kakaoAxios } from "@/util/http-commons";

const kakao = kakaoAxios();

function getCarDirection(param, success, fail) {
  kakao.get(`/directions`, { params: param }).then(success).catch(fail);
}

export { getCarDirection };
