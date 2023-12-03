import { ref } from "vue";
import { apiInstance } from "./instance";
import { localAxios } from "@/util/http-commons";

const local = localAxios();

//POST : users/join
async function plusPlan(param, success, fail) {
  await local.post(`/plans`, param).then(success).catch(fail);
}
//GET : users/{userid}/check
async function getPlans(userid, success, fail) {
  await local.get(`/plans/${userid}`).then(success).catch(fail);
}
async function deletePlan(planno, success, fail) {
  local.delete(`/plans/${planno}`).then(success).catch(fail);
}

export { plusPlan, getPlans, deletePlan };
