import { ref } from "vue";
import { apiInstance } from "./instance";
import { localAxios } from "@/util/http-commons";

const local = localAxios();

//POST : users/join
async function joinUser(param, success, fail) {
  await local.post(`/users/join`, param.value).then(success).catch(fail);
}
//GET : users/{userid}/check
async function idCheck(userid, success, fail) {
  await local.get(`/users/${userid}/check`).then(success).catch(fail);
}
async function login(user, success, fail) {
  await local
    .post(`/users/login`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}
async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] =
    sessionStorage.getItem("accessToken");
  await local.get(`/users/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] =
    sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/users/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/users/logout/${userid}`).then(success).catch(fail);
}

async function modify(user, success, fail) {
  await local.put(`/users/`, user).then(success).catch(fail);
}

async function remove(userid, success, fail) {
  await local.delete(`/users/${userid}`).then(success).catch(fail);
}

//GET : users/{userid}
async function getUser(userid, success, fail) {
  await local.put(`/users/${userid}`).then(success).catch(fail);
}

export {
  joinUser,
  idCheck,
  login,
  findById,
  tokenRegeneration,
  logout,
  modify,
  remove,
  getUser,
};
