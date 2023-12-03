import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listArticle(param, success, fail) {
  local.get(`/board`, { params: param }).then(success).catch(fail);
}

function detailArticle(articleno, success, fail) {
  local.get(`/board/${articleno}`).then(success).catch(fail);
}

function detailArticleNoUpdate(articleno, success, fail) {
  local.get(`/board/${articleno}/noUpdate`).then(success).catch(fail);
}

function registArticle(article, success, fail) {
  console.log("boardjs article", article);
  local.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function getModifyArticle(articleno, success, fail) {
  local.get(`/board/modify/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  local.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  local.delete(`/board/${articleno}`).then(success).catch(fail);
}

async function getComment(articleNo, success, fail) {
  await local.get(`/board/${articleNo}/comments`).then(success).catch(fail);
}
async function addComment(article, success, fail) {
  await local
    .post(`/board/${article.articleNo}/comments`, article)
    .then(success)
    .catch(fail);
}
async function deleteComment(article, success, fail) {
  await local
    .delete(
      `/board/${article.articleNo}/comments/${article.commentNo}`,
      article
    )
    .then(success)
    .catch(fail);
}
async function addLike(article, success, fail) {
  await local
    .post(`/board/${article.articleNo}/likes`, article)
    .then(success)
    .catch(fail);
}
async function isLike(article, success, fail) {
  await local
    .get(`/board/${article.articleNo}/${article.userId}/isLike`, article)
    .then(success)
    .catch(fail);
}
async function deleteLike(article, success, fail) {
  await local
    .delete(`/board/${article.articleNo}/${article.userId}/like`)
    .then(success)
    .catch(fail);
}

async function getFilePath(userId, success, fail) {
  await local.get(`/users/${userId}/filePath`).then(success).catch(fail);
}

export {
  listArticle,
  detailArticle,
  registArticle,
  getModifyArticle,
  modifyArticle,
  deleteArticle,
  getComment,
  addComment,
  addLike,
  isLike,
  deleteLike,
  detailArticleNoUpdate,
  getFilePath,
  deleteComment,
};
