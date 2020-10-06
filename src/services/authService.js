import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

// whenever http request happens, this token will be included. if user not logged in, token is undefined
// so header will not be set.
http.setJwt(getJwt());

export async function login(email, password) {
  // grabs user credentials, and then sets localStorage token
  const { data: JWT } = await http.post(apiEndpoint, {
    // same as email:email, password:password
    email,
    password,
  });

  localStorage.setItem(tokenKey, JWT);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // valid JWT in storage? then return user object
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default { login, logout, getCurrentUser, loginWithJwt, getJwt };
