<template>
    <v-app v-cloak>
        <v-app-bar class="transparent" elevation="0" app v-if="!mobile">
            <v-container>
                <v-toolbar-title>
                    <span class="headline font-weight-light">{{ info.company }}</span>
                    <span class="headline font-weight-bold">{{ info.companyExtended }}</span>
                </v-toolbar-title>
            </v-container>
        </v-app-bar>

        <v-content class="with-backdrop" :style="contentStyle">
            <v-container fill-height :class="{ 'pa-0': mobile }">
                <v-card flat :color="mobile ? 'white' : 'transparent'" :style="{ width: width, height: height }">
                    <v-img class="grey lighten-4 with-backdrop" :src="info.background" :aspect-ratio="4/3" v-if="mobile">
                        <div class="d-flex flex-column fill-height">
                            <div class="d-flex align-end justify-center" style="flex: 1 1 auto;">
                                <v-img :src="info.logo" style="max-width: 128px;" />
                            </div>
                            
                            <div class="d-block pt-4 pb-3">
                                <div class="d-block text-uppercase headline text-center">
                                    <span class="font-weight-light">{{ info.product }}</span>
                                    <span class="font-weight-bold">{{ info.productExtended }}</span>
                                </div>

                                <div class="d-block text-uppercase subtitle-2 text-center">
                                    <span class="font-weight-light">{{ info.slogan }}</span>
                                </div>
                            </div>
                        </div>
                    </v-img>

                    <v-row no-gutters>
                        <v-col v-if="!mobile"
                            sm="6" 
                            cols="12" 
                            :class="{ 'd-flex flex-column justify-center': !mobile }"
                        >
                            <div class="d-block mb-6" style="max-width: 112px;">
                                <v-img :src="info.logo"></v-img>
                            </div>
                            
                            <div class="d-block text-uppercase display-1">
                                <span class="font-weight-light">{{ info.product }}</span>
                                <span class="font-weight-bold">{{ info.productExtended }}</span>
                            </div>

                            <div class="d-block text-uppercase title mt-1">
                                <span class="font-weight-light">{{ info.slogan }}</span>
                            </div>

                            <div class="d-block font-weight-light body-2 mt-3" v-html="info.description"/>
                        </v-col>

                        <v-col 
                            sm="6" 
                            cols="12" 
                            :class="{ 'd-flex align-center justify-center': !mobile }"
                        >
                            <v-spacer></v-spacer>

                            <v-card 
                                :elevation="mobile ? 0 : 1" 
                                :width="mobile ? '100%' : '360px'" 
                                :class="{ 'px-2': mobile }"
                            >
                                <v-sheet color="cyan" class="pa-4 mx-auto elevation-0" max-width="calc(100% - 32px)" style="margin-top: -16px;" v-if="!mobile">
                                    <span class="d-block text-uppercase font-weight-medium text-xs-center line-height-1 white--text">l o g i n</span>
                                    <span class="d-block headline font-weight-light letter-space-1 text-uppercase text-xs-center mt-2 line-height-1 white--text">authentication</span>
                                </v-sheet>

                                <v-card-text>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-text-field
                                                color="cyan"
                                                label="Username"
                                                prepend-inner-icon="mail_outline"
                                                v-model="authorize.username"
                                                autocomplete="off"
                                                hide-details
                                                single-line
                                            ></v-text-field>
                                        </v-col>

                                        <v-col class="mt-4" cols="12">
                                            <v-text-field 
                                                @keyup.enter="authentication"
                                                @click:append="showtext = !showtext"
                                                :append-icon="showtext ? 'visibility' : 'visibility_off'"
                                                :type="showtext ? 'text' : 'password'"
                                                color="cyan"
                                                label="Password"
                                                prepend-inner-icon="lock_open"
                                                v-model="authorize.userpass"
                                                autocomplete="off"
                                                hide-details
                                                single-line
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-text>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-btn color="cyan" block depressed rounded large dark @click="authentication">login to app</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </v-content>
        
        <v-snackbar v-model="snackbar.state" :color="snackbar.color">
            {{ snackbar.text }}
            <v-btn dark text @click="snackbarClose">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'login',

    computed: {
        ...mapState(['auth', 'info', 'mobile', 'snackbar']),

        contentStyle: function() {
            if (this.info && this.info.background && !this.mobile) {
                return `background: url(${this.info.background}); background-position: center; background-repeat: no-repeat; background-size: cover;`;
            }

            return null;
        },

        height: function() {
            return this.mobile ? '100%' : 'auto';
        },

        width: function() {
            return '100%';
        }
    },

    data:() => ({
        showtext: false,
        authorize: {
            username: 'admin@monoland.loc',
            userpass: 'rahasia'
        }
    }),

    created() {
        this.initData();
        this.fetchInfo();
    },

    methods: {
        ...mapActions(['fetchInfo', 'initData', 'signin', 'snackbarClose']),
        
        authentication: function() {
            this.signin({
                username: this.authorize.username,
                userpass: this.authorize.userpass
            }).then(() => {
                this.$router.push({ name: 'backend-home' });
            });
        }
    }
};
</script>

<style lang="sass">
    @import '@sass/application.sass'
    @import '@sass/backdrop.sass'
</style>