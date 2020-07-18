import router from "./js/router.js";
import { app } from "./js/components/App/App.ste.js";
import { MainPage } from "./js/pages/MainPage/index.ste.js";
import { SigninPage } from "./js/pages/SigninPage/index.ste.js";
import { SignupPage } from "./js/pages/SignupPage/index.ste.js";
import { UserSettings } from "./js/pages/UserSettings/index.ste.js";

document.querySelector("#app").appendChild(app.getContent());

router
  .use("#/", MainPage)
  .use("#/signin", SigninPage)
  .use("#/signup", SignupPage)
  .use("#/settings", UserSettings)
  .start();
