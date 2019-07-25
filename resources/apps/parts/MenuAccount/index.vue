<template>
    <v-list class="v-list--more">
        <v-list-tile :active-class="$root.theme + '--text'" :to="{ name: 'profile' }">
            <v-list-tile-action><v-icon>perm_contact_calendar</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :active-class="$root.theme + '--text'" :to="{ name: 'password' }">
            <v-list-tile-action><v-icon>lock</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Katasandi</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :active-class="$root.theme + '--text'" :to="{ name: 'setting' }" v-if="$auth.authent === 'administrator'">
            <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Setting</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :active-class="$root.theme + '--text'" @click="signout">
            <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Keluar</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
export default {
    name: 'v-menu-account',

    methods: {
        signout: function() {
            this.$auth.signout();
            this.$router.push({ name: 'login' });
        }
    }
}
</script>
