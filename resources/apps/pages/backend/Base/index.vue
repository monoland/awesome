<template>
    <v-app v-cloak>
        <v-menu-apps></v-menu-apps>
        
        <v-content :class="`${$root.theme} lighten-5`">
            <v-card height="100%" color="transparent" flat v-if="$vuetify.breakpoint.xsOnly">
                <router-view :key="$route.path"></router-view>

                <v-bottom-navigation 
                    grow absolute shift
                >
                    <v-btn text :color="$root.theme" :to="{ name: 'home' }">
                        <span>Beranda</span>
                        <v-icon>home</v-icon>
                    </v-btn>

                    <v-btn text :color="$root.theme" :to="{ name: 'profile' }">
                        <span>Profile</span>
                        <v-icon>perm_identity</v-icon>
                    </v-btn>

                    <v-btn text :color="$root.theme" :to="{ name: 'password' }">
                        <span>Password</span>
                        <v-icon>lock</v-icon>
                    </v-btn>

                    <v-btn text :color="$root.theme" :to="{ name: 'setting' }">
                        <span>Setting</span>
                        <v-icon>settings</v-icon>
                    </v-btn>

                    <v-btn text :color="$root.theme" @click="signout">
                        <span>Signout</span>
                        <v-icon>exit_to_app</v-icon>
                    </v-btn>
                </v-bottom-navigation>
            </v-card>

            <router-view :key="$route.path" v-else></router-view>
        </v-content>

        <v-snackbar
            v-model="snackbar.state"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <v-btn dark flat @click="snackbarClose">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'page-base',

    computed: {
        ...mapState(['auth', 'snackbar']),
    },

    created() {
        if (!this.$root.theme) this.$root.theme = this.auth.theme;
    },

    methods: {
        ...mapActions(['snackbarClose', 'signout'])
    }
};
</script>