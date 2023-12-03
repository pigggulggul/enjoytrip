import { ref } from "vue";
import { apiInstance } from "./instance";
import { localAxios } from "@/util/http-commons";

const local = localAxios();

//POST : users/join
async function addTrip(param, success, fail) {
  await local.post(`/mytrips`, param).then(success).catch(fail);
}
//GET : users/{userid}/check
async function getTrip(planNo, success, fail) {
  await local.get(`/mytrips/${planNo}`).then(success).catch(fail);
}
async function modifyTrip(plan, success, fail) {
  local.defaults.headers["refreshToken"] =
    sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.put(`/mytrips/route`, plan).then(success).catch(fail);
}
async function deleteTrip(mytripno, success, fail) {
  local.delete(`/mytrips/${mytripno}`).then(success).catch(fail);
}
export { addTrip, getTrip, modifyTrip, deleteTrip };
