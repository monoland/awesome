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

/**
 * application build
 */
import Apps from './pages/Apps.vue';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';

new Vue({
    router,
    store,
    vuetify,

    data:() => ({
        theme: null,
        drawer: null,
    }),

    beforeDestroy () {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onResize, { passive: true })
        }
    },

    mounted () {
        this.onResize()
        window.addEventListener('resize', this.onResize, { passive: true })
    },
  
    methods: {
        onResize () {
            let mobile = window.innerWidth < 600;

            if (mobile !== this.$store.state.mobile) {
                this.$store.dispatch('setMobileMode', mobile);
            }
        },
    },

    render: h => h(Apps)
}).$mount('#monoland');