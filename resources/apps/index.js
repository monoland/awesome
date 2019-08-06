import Vue from 'vue';

Vue.config.productionTip = false;

// import component
import * as Parts from './parts';
Object.keys(Parts).forEach((part) => {
    Vue.component(Parts[part].name, Parts[part]);
});

// transition
import { createSimpleTransition } from 'vuetify/es5/util/helpers';
const dialogMove = createSimpleTransition('dialog-move-transition');
Vue.component('dialog-move-transition', dialogMove);

// add press directive
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
import router from './plugin/router';
import store from './plugin/store';
import vuetify from './plugin/vuetify';

new Vue({
    router,
    store,
    vuetify,
    
    data:() => ({
        theme: null,
        navdrawer: false,
    }),
    created() {
        this.navdrawer = this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl';
    },
    render: h => h(Apps)
}).$mount('#monoland');