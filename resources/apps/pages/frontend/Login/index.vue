<template>
    <v-app v-cloak>
        <v-content class="v-content__auth" :style="cssbackground">
            <v-container fluid fill-height>
                <v-layout align-center justify-center column>
                    <v-card class="v-card--auth mt-4 mx-auto" elevation="1" :width="formwidth">
                        <v-sheet
                            class="v-sheet--offset mx-auto pa-3"
                            color="cyan"
                            elevation="9"
                            max-width="calc(100% - 48px)"
                        >
                            <span class="d-block text-uppercase font-weight-medium text-xs-center white--text">l o g i n</span>
                            <span class="d-block headline font-weight-light letter-space-1 text-uppercase text-xs-center mt-1 white--text">authentication</span>
                        </v-sheet>

                        <v-card-text>
                            <v-text-field
                                color="cyan"
                                label="Username"
                                prepend-inner-icon="mail_outline"
                                v-model="username"
                                autocomplete="off"
                            ></v-text-field>

                            <v-text-field
                                color="cyan"
                                label="Password"
                                prepend-inner-icon="lock_open"
                                v-model="userpass"
                                autocomplete="off"
                                :append-icon="showtext ? 'visibility' : 'visibility_off'"
                                @click:append="showtext = !showtext"
                                :type="showtext ? 'text' : 'password'"
                            ></v-text-field>
                        </v-card-text>

                        <v-card-actions class="justify-center">
                            <v-btn block color="cyan" flat @click="signin">login to apps</v-btn>
                        </v-card-actions>
                    </v-card>

                    <span class="d-block text-uppercase mt-5 text-xs-center white--text">
                        <small>monoland &copy; 2019</small>
                    </span>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'page-login',

    computed: {
        cssbackground: function() {
            let image = null;

            if (!image) return '';

            return `background: url(${image}) no-repeat center center fixed;`;
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
        showtext: false,
        username: null,
        userpass: null
    }),

    methods: {
        signin: async function() {
            try {
                let token = await this.$http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: this.$auth.siteKey,
                    client_secret: this.$auth.secretKey,
                    username: this.username,
                    password: this.userpass,
                    scope: '*'
                });

                this.$auth.token = token.data;

                let user = await this.$http.get('/api/user');

                this.$auth.user = user.data;

                this.$router.push({ name: 'home' });
            } catch (error) {
                this.$error = error;
            }
        }
    }
}
</script>
