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
                urls: ['/fonts/webfont.min.css']
            },
            active: this.setFontLoaded
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

<style lang="sass">
    @import '@sass/card.sass'
    @import '@sass/general.sass'
    @import '@sass/textField.sass'
</style>