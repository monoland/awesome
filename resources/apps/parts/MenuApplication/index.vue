<template>
    <v-navigation-drawer v-model="$root.navdrawer" app>
        <v-toolbar flat color="white">
            <v-list class="v-list--user">
                <v-list-tile avatar @click="expand = !expand">
                    <v-list-tile-avatar>
                        <img :src="user.avatar" v-if="user.avatar">
                        <v-icon class="grey darken-1 white--text" v-else>perm_identity</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title class="font-weight-medium">{{ user.name }}</v-list-tile-title>
                        <v-list-tile-sub-title class="caption f-nunito line-height1">{{ user.email }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action :class="{ 'expand': expand }" v-if="!$vuetify.breakpoint.xsOnly">
                        <v-icon color="grey lighten-1">keyboard_arrow_down</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <template v-if="$vuetify.breakpoint.xsOnly">
            <v-menu-account></v-menu-account>
        </template>

        <template v-else>
            <v-expand-transition>
                <div class="more__wrap" v-show="expand">
                    <v-menu-account></v-menu-account>
                    <v-divider></v-divider>
                </div>
            </v-expand-transition>

            <v-list class="v-list--main">
                <template v-for="(menu, index) in menus">
                    <v-list-tile :active-class="$root.theme + '--text'" :to="menu.to" v-if="menu.type === 'item'">
                        <v-list-tile-action><v-icon>{{ menu.icon }}</v-icon></v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ menu.text }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider :class="menu.class" v-else-if="menu.type === 'divider'"></v-divider>

                    <v-subheader 
                        class="text-uppercase" 
                        :class="menu.class" 
                        v-else-if="menu.type === 'subheader'"
                    >{{ menu.text }}</v-subheader>
                    
                    <v-list-group :prepend-icon="menu.icon" v-else>
                        <v-list-tile slot="activator">
                            <v-list-tile-title>{{ menu.text }}</v-list-tile-title>    
                        </v-list-tile>

                        <template v-for="(item, index) in menu.items">
                            <v-list-tile :to="item.to">
                                <v-list-tile-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                </template>
            </v-list>
        </template>        
    </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'v-menu-application',

    data:() => ({
        menus: null,
        user: {},
        expand: false
    }),

    mounted() {
        if (!this.$auth.menus) {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'auth' && mutation.payload.hasOwnProperty('menus')) {
                    this.menus = mutation.payload.menus;
                }
            });

            this.fetchMenus();
        } else {
            this.menus = this.$auth.menus;
        }

        this.user = this.$auth.user;
    },

    methods: {
        ...mapActions(['fetchMenus'])
    },
}
</script>