<template>
    <v-list>
        <template v-for="(menu, index) in appmenus">
            <v-list-item :active-class="theme + '--text'" :to="menu.route" :key="index" v-if="menu.type === 'item'">
                <v-list-item-action><v-icon>{{ menu.icon }}</v-icon></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ menu.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-subheader 
                :class="menu.class" 
                :key="index"
                class="overline mt-3" 
                style="height: 24px;"
                v-else-if="menu.type === 'subheader'"
            >
                {{ menu.name }}
            </v-subheader>
        </template>

        <slot></slot>
    </v-list>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-auth-menu',

    computed: {
        ...mapState(['theme', 'menus']),

        appmenus: function() {
            return this.menus.reduce((results, menuitem) => {
                if (menuitem.menu) {
                    if (menuitem.maps) {
                        let idx = results.findIndex(obj => obj.name === menuitem.maps && obj.type === 'subheader');

                        if (idx === -1) {
                            results.push({ name: menuitem.maps, type: 'subheader' });
                            results.push({ name: menuitem.name, route: { name: menuitem.slug }, icon: menuitem.icon, type: 'item' });
                        } else {
                            results.push({ name: menuitem.name, route: { name: menuitem.slug }, icon: menuitem.icon, type: 'item' });
                        }
                    } else {
                        results.push({ name: menuitem.name, route: { name: menuitem.slug }, icon: menuitem.icon, type: 'item' });
                    }
                }

                return results;
            }, []);
        }
    },

    methods: {
        ...mapActions(['getUserMenu']),
    },

    created() {
        this.getUserMenu({ url: '/api/menus' });
    }
}
</script>