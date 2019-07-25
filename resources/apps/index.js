import Vue from 'vue';
import Vuetify from 'vuetify';
import { AuthProvider } from './mixins/AuthProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AuthProvider);

import { createSimpleTransition } from 'vuetify/es5/util/helpers';
const dialogMove = createSimpleTransition('dialog-move-transition');
Vue.component('dialog-move-transition', dialogMove);

import * as Parts from './parts';
Object.keys(Parts).forEach((part) => {
    Vue.component(Parts[part].name, Parts[part]);
});

import Hammer from 'hammerjs';
Vue.directive('press', {
    bind:(el, binding) => {
        if (typeof binding.value === 'function') {
            const mc = new Hammer(el);
            mc.get('press').set({ time: 1000 });
            mc.on('press', binding.value);
        }
    }
});

import Apps from './pages/Apps.vue';
import router from './routes';
import store from './mixins/DataProvider';

new Vue({
    router,
    store,
    
    data:() => ({
        theme: null,
        navdrawer: false,
    }),
    
    beforeCreate() {
        this.$nextTick(() => {
            this.navdrawer = this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl'
        });
    },
    
    created() {
        this.$store.commit('setAuth', this.$auth);
    },

    render: h => h(Apps)
}).$mount('#monoland');