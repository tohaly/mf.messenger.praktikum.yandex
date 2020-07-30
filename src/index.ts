import "./index.css";
import router from "./js/router";
import { app } from "./js/components/App/App";

import {
  ServerError,
  NotFound,
  MainPage,
  SigninPage,
  SignupPage,
  UserSettings,
} from "./js/pages/index";

document.querySelector("#app").appendChild(app.getContent());

router
  .use("#/", MainPage)
  .use("#/signin", SigninPage)
  .use("#/signup", SignupPage)
  .use("#/settings", UserSettings)
  .use("#/error", ServerError)
  .use("#/notfound", NotFound)
  .start();
