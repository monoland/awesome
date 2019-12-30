<template>
    <v-scale-transition origin="center center">
        <v-app v-cloak>
            <v-navigation-drawer v-model="$root.drawer" app>
                <v-auth-user @click="expand = !expand"/>

                <v-expand-transition>
                    <div v-show="expand">
                        <v-list>
                            <v-list-item :active-class="$root.theme + '--text'" :to="{ name: 'backend-profile' }">
                                <v-list-item-action><v-icon>perm_identity</v-icon></v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>Profile</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item :active-class="$root.theme + '--text'" :to="{ name: 'backend-password' }">
                                <v-list-item-action><v-icon>lock</v-icon></v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>Katasandi</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>
                    </div>
                </v-expand-transition>

                <v-list>
                    <template v-for="(menu, index) in menus">
                        <v-list-item :active-class="$root.theme + '--text'" :to="menu.to" :key="index" v-if="menu.type === 'item'">
                            <v-list-item-action><v-icon>{{ menu.icon }}</v-icon></v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ menu.text }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider :class="menu.class" :key="index" v-else-if="menu.type === 'divider'"></v-divider>

                        <v-subheader 
                            class="text-uppercase" 
                            :class="menu.class" 
                            :key="index"
                            v-else-if="menu.type === 'subheader'"
                        >{{ menu.text }}</v-subheader>

                        <v-list-group :prepend-icon="menu.icon" :key="index" v-else>
                            <v-list-item slot="activator">
                                <v-list-item-title>{{ menu.text }}</v-list-item-title>    
                            </v-list-item>

                            <template v-for="(item, idx) in menu.items">
                                <v-list-item :to="item.to" :key="idx">
                                    <v-list-item-action>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-action>
                                    
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list-group>
                    </template>

                    <v-list-item :active-class="$root.theme + '--text'" @click="homeRouter">
                        <v-list-item-action><v-icon>exit_to_app</v-icon></v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Keluar</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-content :class="`${$root.theme} lighten-5`">
                <router-view :key="$route.path"></router-view>
            </v-content>

            <v-page-upload></v-page-upload>

            <v-snackbar v-model="snackbar.state" :color="snackbar.color" :timeout="3500">
                {{ snackbar.text }}
                <v-btn dark text @click.stop="snackbarClose">Tutup</v-btn>
            </v-snackbar>
        </v-app>
    </v-scale-transition>
</template>

<script>
import { baseMixins } from '@apps/mixins/BaseMixins';

export default {
    name: 'backend-base',

    mixins: [baseMixins],

    data:() => ({
        expand: false
    })
};
</script>

<style lang="sass">
    @import '@sass/backdrop.sass'
    @import '@sass/button.sass'
    @import '@sass/dataTable.sass'
    @import '@sass/list.sass'
    @import '@sass/page.sass'
    @import '@sass/navigationDrawer.sass'
    @import '@sass/toolbar.sass'
</style>