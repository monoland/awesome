import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@apps/providers/AuthProvider';

Vue.use(VueRouter);

const Login = () => import(/* webpackChunkName: "scripts/core/authent" */ '@apps/pages/frontend/Login');
const backendBase = () => import(/* webpackChunkName: "scripts/core/backend" */ '@apps/pages/backend/Base');
const backendHome = () => import(/* webpackChunkName: "scripts/core/backend" */ '@apps/pages/backend/Home');
const backendUser = () => import(/* webpackChunkName: "scripts/core/backend" */ '@apps/pages/backend/User');
const backendProfile = () => import(/* webpackChunkName: "scripts/core/backend" */ '@apps/pages/backend/Profile');
const backendPassword = () => import(/* webpackChunkName: "scripts/core/backend" */ '@apps/pages/backend/Password');

let routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/backend', meta: { auth: true }, component: backendBase, children: [
        { path: '', name: 'backend', redirect: { name: 'backend-home' } },
        { path: 'home', name: 'backend-home', component: backendHome },
        { path: 'user', name: 'backend-user', component: backendUser },
        { path: 'password', name: 'backend-password', component: backendPassword },
        { path: 'profile', name: 'backend-profile', component: backendProfile },
    ]},
    { path: '*', name: null, redirect: { name: 'login' } },
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!Auth.check) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        if (to.name === 'login' && Auth.check) {
            next({ name: 'backend-home' });
        } else {
            next();
        }
    }
});

router.onError(() => {
    Auth.signout();
    router.push({ name: 'login' });
});

export default router;