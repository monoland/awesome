<template>
    <div class="apps" v-if="fontLoaded">
        <v-fade-transition origin="center center">
            <router-view></router-view>
        </v-fade-transition>
    </div>
</template>

<script>
import WebFontLoader from 'webfontloader';

export default {
    name: 'apps',

    data:() => ({
        fontLoaded: false,
    }),

    mounted() {
        WebFontLoader.load({
            custom: {
                families: ['Roboto', 'Nunito', 'Ubuntu Mono', 'Material Icons'],
                urls: [`/fonts/webfont.min.css`]
            },
            
            active: this.setFontLoaded,

            timeout: 2000
        })
    },

    methods: {
        setFontLoaded: function() {
            this.$nextTick(() => {
                this.fontLoaded = true;
            });
        }
    }
};
</script>