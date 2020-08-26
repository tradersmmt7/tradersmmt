import { getCookie } from "./Cookies";

const baseURL = "http://localhost:4000";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Access-Control-Allow-Credentials", "true");

export const getCall = (url) => {
  return fetchCall(url, {
    method: "GET",
    headers: myHeaders,
  });
};

export const postCall = (url, data) => {
  return fetchCall(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: myHeaders,
  });
};

export const authGetCall = (url, data) => {
  let token = getCookie("token");
  return fetchCall(url, {
    method: "GET",
    headers: new Headers({
      Authorization: token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Authorization",
    }),
  });
};

export const authPostCall = (url, data) => {
  let token = getCookie("token");
  return fetchCall(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};

const fetchCall = (url, data) => {
  return fetch(baseURL + url, data).then((resp) => resp.json());
};
