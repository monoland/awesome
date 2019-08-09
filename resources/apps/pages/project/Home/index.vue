<template>
    <v-page-wrap no-trash>
        <!--  -->
    </v-page-wrap>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'page-home',

    created() {
        this.initStore();
        
        this.pageInfo({
            icon: 'home',
            title: 'Beranda',
        });
    },

    data:() => ({
        files: null
    }),

    methods: {
        ...mapActions(['documentOpen', 'pageInfo', 'initStore']),
    }
};
</script>
