import "./index.css";
import router from "./js/router";
import { Header } from "./js/components/";
import { AuthApi } from "./js/API/auth-api"; // TESTING

import {
  ServerError,
  NotFound,
  MainPage,
  SigninPage,
  SignupPage,
  // UserSettings,
} from "./js/pages/index";

export const auth = new AuthApi("/auth/");

document.querySelector("#header").appendChild(new Header().getContent());

router
  .useProtect("#/", MainPage)
  .useDefault("#/signin", SigninPage)
  .use("#/signup", SignupPage)
  // .use("#/settings", UserSettings)
  .use("#/error", ServerError)
  .use("#/notfound", NotFound)
  .start();

const eventItemInserted = new Event("changeLocalStorage");
const storageSetItem = localStorage.setItem;
const storageRemoveItem = localStorage.removeItem;

localStorage.removeItem = function () {
  storageRemoveItem.apply(this, arguments as any);
  document.dispatchEvent(eventItemInserted);
};

localStorage.setItem = function () {
  console.log("do");
  storageSetItem.apply(this, arguments as any);
  document.dispatchEvent(eventItemInserted);
  console.log("posle");
};

const storageHandler = function () {
  if (!localStorage.getItem("login")) {
    router.go("#/signin");
    router.isProtect = true;
    return;
  }
  console.log("here");
  router.isProtect = false;
  router.go("#/");
};

document.addEventListener("changeLocalStorage", storageHandler, false);
