<template>
    <v-app v-cloak>
        <v-menu-application></v-menu-application>

        <v-content :class="`${$root.theme} lighten-5`">
            <v-card height="100%" color="transparent" flat v-if="$vuetify.breakpoint.xsOnly">
                <div class="v-mobile">
                    <div class="v-mobile__wrap">
                        <router-view :key="$route.path"></router-view>
                    </div>        
                </div>
                
                <v-bottom-nav absolute color="white" :value="true" :active.sync="appnav">
                    <v-btn :color="$root.theme" flat :to="{ name: 'home' }">
                        <span>Beranda</span>
                        <v-icon>home</v-icon>
                    </v-btn>

                    <v-btn :color="$root.theme" flat :to="{ name: 'user' }">
                        <span>Pengguna</span>
                        <v-icon>perm_identity</v-icon>
                    </v-btn>

                    <v-btn :color="$root.theme" flat :to="{ name: 'client'}">
                        <span>OAuth Klien</span>
                        <v-icon>whatshot</v-icon>
                    </v-btn>
                </v-bottom-nav>
            </v-card>

            <div class="v-page" v-else>
                <router-view :key="$route.path"></router-view>
            </div>
        </v-content>

        <v-snackbar
            v-model="snackbar.state"
            :color="snackbar.color"

        >
            {{ snackbar.text }}
            <v-btn dark flat @click="closeSnackbar">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'page-base',

    computed: {
        ...mapState(['snackbar'])
    },

    data:() => ({
        appnav: null
    }),

    methods: {
        ...mapActions(['closeSnackbar'])
    }
};
</script>
