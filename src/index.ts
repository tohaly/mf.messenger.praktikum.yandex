import './index.css';
import router from './js/router';
import { authorization } from './js/authorization';
import { Header } from './js/components/';
import { isAlreadyLogin } from './js/util/authHelpers';

import {
  ServerError,
  NotFound,
  MainPage,
  SigninPage,
  SignupPage,
  UserSettings,
} from './js/pages/index';

isAlreadyLogin(authorization);

document.querySelector('#header').appendChild(new Header().getContent());

router
  .useProtect('#/', MainPage)
  .useDefault('#/signin', SigninPage)
  .use('#/signup', SignupPage)
  .use('#/settings', UserSettings)
  .use('#/error', ServerError)
  .use('#/notfound', NotFound)
  .start();

const authListener = function () {
  if (!authorization.login) {
    router.go('#/signin');
    router.isProtect = true;
    return;
  }
  router.isProtect = false;
  router.go('#/');
};

document.addEventListener('changeAuthorization', authListener, false);
