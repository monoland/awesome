import Vue from 'vue';

Vue.config.productionTip = false;

/**
 * component registration
 */
const appComponents = require.context('@apps/parts', true, /index\.vue$/);

appComponents.keys().forEach(component => {
    const componentObject = appComponents(component).default;
    Vue.component(componentObject.name, componentObject);
});

import Apps from '@apps/pages/Apps';
import router from '@apps/plugins/router';
import store from '@apps/plugins/vuex';
import vuetify from '@apps/plugins/vuetify';
import { mapActions } from 'vuex';

new Vue({
    router,
    store,
    vuetify,

    mounted() {
        this.deviceResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.deviceResize, { passive: true })
        }
    },

    beforeDestroy () {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.deviceResize, { passive: true })
        }
    },

    data:() => ({
        drawer: null
    }),

    methods: {
        ...mapActions(['deviceResize']),
    },

    render: h => h(Apps)
}).$mount('#monoland');