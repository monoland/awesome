<template>
    <v-img class="with-darkdrop" :class="$root.theme + '--text'" :src="user.background" :aspect-ratio="16/9">
        <div class="d-flex flex-column fill-height">
            <div class="d-flex align-end justify-start px-4 pb-2" style="flex: 1 1 auto;">
                <v-avatar color="white" size="56" class="elevation-2">
                    <v-img :src="user.avatar"></v-img>
                </v-avatar>
            </div>
            
            <div class="d-block">
                <v-list-item style="max-height: 56px; cursor: pointer;" @click="$emit('click')">
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ user.name }}</v-list-item-title>
                        <v-list-item-subtitle class="white--text">{{ user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon dark>arrow_drop_down</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </div>
        </div>
    </v-img>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-auth-user',

    computed: {
        ...mapState(['auth']),
    },

    data:() => ({
        user: {}
    }),

    mounted() {
        this.user = this.auth.user;

        this.$store.subscribe( mutation => {
            if (mutation.type === 'COMMIT_USER') {
                this.user = mutation.payload;
                this.$root.theme = mutation.payload.theme;
            }
        });
    }
}
</script>