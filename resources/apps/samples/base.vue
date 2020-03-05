<template>
    <v-app v-cloak>
        <v-navigation-drawer v-model="$root.drawer" app>
            <v-toolbar :color="theme" dark flat>
                <v-toolbar-title class="subtitle-1">
                    <span class="font-weight-light white--text">{{ info.company }}</span>
                    <span class="font-weight-bold white--text">{{ info.companyExtended }}</span>
                </v-toolbar-title>
            </v-toolbar>

            <v-responsive 
                class="overflow-y-auto white"
                :height="device.mobile ? `calc(100vh - 56px)` : `calc(100vh - 64px)`"
            >
                <v-auth-user></v-auth-user>
                <v-auth-menu></v-auth-menu>
            </v-responsive>
        </v-navigation-drawer>

        <v-auth-toolbar></v-auth-toolbar>

        <v-content :class="`${theme} lighten-5`">
            <router-view :key="$route.path"></router-view>
        </v-content>

        <v-snackbar v-model="snackbar.state" :color="snackbar.color" :timeout="3500">
            {{ snackbar.text }}
            <v-btn dark text @click.stop="snackbarClose">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { baseMixins } from '@apps/mixins/BaseMixins';
import { domainURL } from '@apps/.env';

export default {
    name: 'moui-base',

    route: 
    { 
        path: '/home', 
        name: null, 
        auth: true, 
        root: true 
    },

    mixins: [baseMixins],

    created() 
    {
        this.setPage({
            domainURL: domainURL.BASE
        });
    },
}
</script>

<style lang="sass">
    @import '@sass/button.sass'
</style>