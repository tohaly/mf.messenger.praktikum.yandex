import { Router } from './util/routing/Router';

const router = new Router('#main-content');
router.isProtect = !localStorage.getItem('login');

export default router;
