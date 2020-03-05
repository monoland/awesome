import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@apps/providers/AuthProvider';

Vue.use(VueRouter);

const pages = require.context('@apps/pages', true, /index\.vue$/);
const routes = [];

/**
 * scan and register route non children
 */
pages.keys().forEach(page => {
    const pageComponent = pages(page).default;

    if (!pageComponent.hasOwnProperty('route')) return;

    let { path, name, auth, apps, root } = pageComponent.route;

    if (typeof root === 'boolean' && root === true) {
        routes.push({ path, meta: { auth }, apps: apps, component: pageComponent, children: [] });
    } else {
        routes.push({ path, name, component: pageComponent });
    }    
});

if (Auth.check) {
    pages.keys().forEach(page => {
        const pageComponent = pages(page).default;

        if (pageComponent.hasOwnProperty('route')) return;

        let menu = Auth.menus.find(menu => menu.slug === pageComponent.name);
        
        if (!menu) return;
        
        let { slug, path, apps } = menu;

        let route = routes.find(obj => obj.apps === apps);

        if (!route) return;

        route.children.push({ path: path, name: slug, component: pageComponent });
    });
}

routes.push({ path: '*', redirect: { name: 'moui-login'} });

/**
 * create new VueRouter instance
 */
const router = new VueRouter({
    mode: 'hash',
    routes
});

/**
 * router match
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!Auth.check) {
            next({ name: 'moui-login' });
        } else {
            next();
        }
    } else {
        if (to.name === 'login' && Auth.check) {
            next({ name: 'moui-home' });
        } else {
            next();
        }
    }
});

/**
 * catch error
 */
router.onError(() => {
    Auth.clear();
    router.push({ name: 'moui-login' });
});

export default router;