import Vue from 'vue';
import VueRouter from 'vue-router';
import { Auth } from '@apps/mixins/AuthProvider';

Vue.use(VueRouter);

import * as frontend from '@apps/pages/frontend';
import * as backend from '@apps/pages/backend';

let router = new VueRouter({
    routes: [
        // front
        { path: '/', name: 'login', component: frontend.Login },

        // backend
        { path: 'backend', component: backend.Base, meta: { auth: true }, children: [
            { path: '', redirect: { name: 'home' }},
            { path: 'client', name: 'client', component: backend.Client },
            { path: 'password', name: 'password', component: backend.Password },
            { path: 'profile', name: 'profile', component: backend.Profile },
            { path: 'setting', name: 'setting', component: backend.Setting },
            { path: 'user', name: 'user', component: backend.User },
            { path: 'home', name: 'home', component: backend.Home },
        ]},

        // 404
        { path: '*', redirect: { name: 'login' }},
    ]
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
            next({ name: 'home' });
        } else {
            next();
        }
    }
});

router.onError(error => {
    Auth.signout();
    router.push({ name: 'login' });
});

export default router;