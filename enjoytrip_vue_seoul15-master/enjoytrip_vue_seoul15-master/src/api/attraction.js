import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiInstance } from "./instance";
const api = apiInstance();
const baseURL = "http://localhost:80/" + "attractions/";
const gugunlist = ref([]);

//GET : attractions/{contentId}
function getAttraction(contentid, success, fail) {
  // await api
  //   .get(baseURL + `${contentid}`)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((e) => {
  //     console.log("attraction error");
  //   });
  api
    .get(baseURL + `${contentid}`)
    .then(success)
    .catch(fail);
}
async function getGugun(sidoCode) {
  return new Promise(async (resolve) => {
    await api
      .get(baseURL + `gugun?sidoCode=${sidoCode}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        console.log("gugun error");
      });
  });
}

//POST : attractions/search
async function postAttraction(param) {
  return new Promise(async (resolve) => {
    await api
      .post(baseURL + `search/`, param.value)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        console.log("attraction error");
      });
  });
}

//POST : attractions/count
async function postAttractionCount(param) {
  await api
    .post(baseURL + `count/`, param.value)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log("attraction error");
    });
}
export { getAttraction, postAttraction, postAttractionCount, getGugun };
