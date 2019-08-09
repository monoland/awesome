<template>
    <v-app v-cloak>
        <v-content class="v-content__auth" :style="cssbackground">
            <v-container fluid fill-height>
                <v-layout align-center justify-center column>
                    <v-widget color="cyan" :elevation="1" :width="formwidth">
                        <template #header>
                            <span class="d-block text-uppercase font-weight-medium text-xs-center white--text">l o g i n</span>
                            <span class="d-block headline font-weight-light letter-space-1 text-uppercase text-xs-center mt-1 white--text">authentication</span>
                        </template>

                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    color="cyan"
                                    label="Username"
                                    prepend-inner-icon="mail_outline"
                                    v-model="login.username"
                                    autocomplete="off"
                                    hide-details
                                    single-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex class="mt-4" xs12>
                                <v-text-field 
                                    @click:append="showtext = !showtext"
                                    :append-icon="showtext ? 'visibility' : 'visibility_off'"
                                    :type="showtext ? 'text' : 'password'"
                                    color="cyan"
                                    label="Password"
                                    prepend-inner-icon="lock_open"
                                    v-model="login.userpass"
                                    autocomplete="off"
                                    hide-details
                                    single-line
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <template #actions>
                            <v-card-text class="px-6 justify-center">
                                <v-btn block color="cyan" outlined @click="signin">login to apps</v-btn>
                            </v-card-text>
                        </template>
                    </v-widget>
                </v-layout>
            </v-container>
        </v-content>

        <v-snackbar
            v-model="snackbar.state"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <v-btn dark text @click="snackbarClose">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'page-login',

    computed: {
        ...mapState(['login', 'snackbar']),

        cssbackground: function() {
            let image = '/mediafiles/original/2e18c72308d567a0939cd918f962a1abf3727035.jpg';

            return `background: url(${image}); background-position: center; background-repeat: no-repeat; background-size: cover;`;
        },

        formwidth: function() {
            let breaksize = this.$vuetify.breakpoint.name;

            if (breaksize === 'xs') {
                return '100%';
            }

            return '330';
        },
    },

    data:() => ({
        showtext: false
    }),

    methods: {
        ...mapActions(['snackbarClose', 'signin'])
    }
};
</script>
