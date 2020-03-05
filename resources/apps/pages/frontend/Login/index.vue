<template>
    <v-app v-cloak>
        <v-app-bar class="transparent" elevation="0" absolute>
            <v-toolbar-title :class="{ 'pl-2': device.mobile }">
                <span class="font-weight-light white--text">{{ info.company }}</span>
                <span class="font-weight-bold white--text">{{ info.companyExtended }}</span>
            </v-toolbar-title>
        </v-app-bar>

        <v-content class="grey lighten-4" :class="{ 'with-backdrop': device.desktop }" :style="contentStyle">
            <v-responsive height="100vh">
                <v-container class="pa-0">
                    <v-row 
                        :class="device.mobile ? `flex-column` : `flex-row`"
                        align="center" 
                        justify="center" 
                        style="height: 100vh;"
                        no-gutters
                    >
                        <v-col :class="{ 'flex-grow-0': device.mobile }">
                            <div class="d-block" v-if="device.mobile">
                                <v-img class="with-backdrop" :aspect-ratio="4/3" :src="info.background">
                                    <div class="d-flex flex-column fill-height">
                                        <div class="d-flex align-center flex-grow-1 justify-center">
                                            <div class="d-flex flex-column align-center">
                                                <div class="d-block mb-5 pt-12" style="max-width: 112px;">
                                                    <v-img :src="info.logo"></v-img>
                                                </div>

                                                <div class="d-block text-center">
                                                    <div class="d-block text-uppercase headline">
                                                        <span class="blue-grey--text text--lighten-5 font-weight-light">
                                                            {{ info.product }}
                                                        </span>
                                                        <span class="blue-grey--text text--lighten-5 font-weight-bold">
                                                            {{ info.productExtended }}
                                                        </span>
                                                    </div>

                                                    <div class="d-block text-uppercase body-2">
                                                        <span class="blue-grey--text text--lighten-5 font-weight-normal">
                                                            {{ info.slogan }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="v-moui__card_top_corner flex-grow-0"></div>
                                    </div>
                                </v-img>                                
                            </div>
                            
                            <div class="d-block" v-else>
                                <v-img :aspect-ratio="16/9">
                                    <div class="d-flex flex-column fill-height">
                                        <div class="d-flex align-center flex-grow-1">
                                            <div class="d-flex flex-column">
                                                <div class="d-block mb-5" style="max-width: 112px;">
                                                    <v-img :src="info.logo"></v-img>
                                                </div>

                                                <div class="d-block text-left" style="max-width: 480px;">
                                                    <div class="d-block text-uppercase display-1">
                                                        <span class="blue-grey--text text--lighten-5 font-weight-light">
                                                            {{ info.product }}
                                                        </span>
                                                        <span class="blue-grey--text text--lighten-5 font-weight-bold">
                                                            {{ info.productExtended }}
                                                        </span>
                                                    </div>

                                                    <div class="d-block text-uppercase body-2 mt-1">
                                                        <span class="blue-grey--text text--lighten-5 font-weight-normal">
                                                            {{ info.slogan }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-img>
                            </div>
                        </v-col>

                        <v-col :class="{ 'flex-grow-0': device.desktop }">
                            <v-card 
                                :class="{ 'v-card--with-border': device.desktop }"
                                :elevation="device.mobile ? 0 : 1" 
                                :height="device.mobile ? `100%` : `auto`"
                                :width="device.mobile ? `100%` : `360px`"
                            >
                                <v-sheet 
                                    color="cyan" 
                                    class="pa-4 mx-auto elevation-0" 
                                    max-width="calc(100% - 48px)" 
                                    style="margin-top: -24px;" v-if="device.desktop"
                                >
                                    <span 
                                        class="
                                            d-block 
                                            text-uppercase 
                                            font-weight-medium 
                                            text-center 
                                            line-height-1 
                                            letter-space-1
                                            white--text"
                                    >
                                        login
                                    </span>
                                    <span 
                                        class="
                                            d-block 
                                            headline 
                                            font-weight-light 
                                            letter-space-1 
                                            text-uppercase 
                                            text-center 
                                            mt-2 
                                            line-height-1 
                                            white--text"
                                    >
                                        authentication
                                    </span>
                                </v-sheet>

                                <v-card-text class="px-6" :class="device.mobile ? `pt-0` : `pt-3 pb-2`">
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <!-- v-mask="umask" -->
                                            <v-text-field
                                                class="title font-weight-light"
                                                color="cyan"
                                                label="Email Address"
                                                prepend-inner-icon="perm_identity"
                                                autocomplete="off"
                                                hide-details
                                                single-line
                                                v-model="uname"
                                            ></v-text-field>
                                        </v-col>
                                        
                                        <v-col cols="12" class="mt-4">
                                            <v-text-field
                                                class="title font-weight-light"
                                                color="cyan"
                                                label="Password"
                                                prepend-inner-icon="lock_open"
                                                autocomplete="off"
                                                hide-details
                                                single-line
                                                v-model="upass"
                                                @click:append="visible = !visible"
                                                :append-icon="visible ? 'visibility' : 'visibility_off'"
                                                :type="visible ? 'text' : 'password'"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="mt-9 mb-3">
                                            <v-btn 
                                                color="cyan" 
                                                block 
                                                depressed 
                                                rounded 
                                                large 
                                                dark
                                                @click="postAuthent"
                                            >
                                                Signin
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-responsive>
        </v-content>

        <v-snackbar v-model="snackbar.state" :color="snackbar.color" :timeout="3500">
            {{ snackbar.text }}
            <v-btn dark text @click.stop="snackbarClose">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

import { mapActions, mapState } from 'vuex';
import { domainURL } from '@apps/.env';

export default {
    name: 'moui-login',

    route: { 
        path: '/', 
        name: 'moui-login', 
        auth: false, 
        root: false 
    },

    computed: {
        ...mapState(['device', 'info', 'snackbar']),

        contentStyle: function() {
            if (!this.device.mobile && this.info.background) {
                return `background: url(${this.info.background}); 
                        background-position: center center; 
                        background-repeat: no-repeat; 
                        background-size: cover;`;
            }

            return ``;
        },
    },

    data:() => ({
        uname: '',
        upass: '',
        visible: false
    }),

    mounted() {
        this.setPage({
            domainURL: domainURL.BASE
        }).then(() => {
            this.getAppsInfo({ url: '/info' });
        });
    },

    methods: {
        ...mapActions([
            'getAppsInfo', 'getUserMenu', 'setPage', 
            'setRouteRegister', 'signIn', 'snackbarClose'
        ]),

        postAuthent: function() {
            this.signIn({
                username: this.uname.replace(/ /g, ''),
                userpass: this.upass
            }).then(pass => {
                if (!pass) { 
                    console.clear();
                    return;
                }

                try {
                    this.getUserMenu({ url: '/api/menus' }).then(() => {
                        this.setRouteRegister().then(routes => {
                            const { routes: existingRoute } = this.$router.options;

                            routes.forEach(route => {
                                let parentRoute = existingRoute.find(r => r.path === route.path);

                                if (parentRoute.hasOwnProperty('children') && parentRoute.children.length === 0) {
                                    parentRoute.children = route.children;
                                    this.$router.addRoutes([parentRoute]);
                                }
                            });
                            
                            this.$router.push({ name: 'moui-home' });
                        });
                        
                    });
                } catch (error) {
                    // console.log('xxx');
                }
            });
        }
    }
}
</script>

<style lang="sass">
    @import '@sass/card.sass'
    @import '@sass/moui.sass'
    @import '@sass/textfield.sass'
</style>