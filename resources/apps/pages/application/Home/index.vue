<template>
    <v-card height="100%" color="transparent" flat>
        <v-header :searchable="false"></v-header>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'page-home',

    computed: {
        ...mapState([ 'auth' ]),
    },

    created() {
        this.resetStore();
        
        this.$store.commit('http', this.$http);
        
        this.setPageInfo({
            icon: 'people',
            title: 'Beranda',
        });

        if (!this.$root.theme) this.$root.theme = this.auth.theme;
    },

    data:() => ({}),

    methods: {
        ...mapActions(['resetStore', 'setPageInfo']),
    },
};
</script>
