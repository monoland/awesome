import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@apps/mixins/AuthProvider';

Vue.use(VueRouter);

import * as project from '@apps/pages/project';
import * as frontend from '@apps/pages/frontend';
import * as backend from '@apps/pages/backend';

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes: [
        // frontend
        { path: '/', name: 'login', component: frontend.Login },
        
        // backend
        { path: '/backend', component: backend.Base, meta: { auth: true }, children: [
            { path: '', redirect: { name: 'home' }},
            { path: 'client', name: 'client', component: backend.Client },
            { path: 'document', name: 'document', component: backend.Document },
            { path: 'password', name: 'password', component: backend.Password },
            { path: 'profile', name: 'profile', component: backend.Profile },
            { path: 'setting', name: 'setting', component: backend.Setting },
            { path: 'user', name: 'user', component: backend.User },
            
            // project
            { path: 'home', name: 'home', component: project.Home },
        ]},

        // fallback
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

router.onError(() => {
    Auth.signout();
    router.push({ name: 'login' });
});

export default router;