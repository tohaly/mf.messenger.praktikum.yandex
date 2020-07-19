import router from './js/router.js';
import { app } from './js/components/App/App.js';
import { ServerError, NotFound, MainPage, SigninPage, SignupPage, UserSettings, } from './js/pages/index.js';
document.querySelector("#app").appendChild(app.getContent());
router
    .use("#/", MainPage)
    .use("#/signin", SigninPage)
    .use("#/signup", SignupPage)
    .use("#/settings", UserSettings)
    .use("#/error", ServerError)
    .use("#/notfound", NotFound)
    .start();
