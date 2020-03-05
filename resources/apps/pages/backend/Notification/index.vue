<template>
    <v-page-wrap>
        
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-notification',

    computed: {
        ...mapState(['device', 'form', 'record'])
    },

    created() {
        this.setPage({
            dataURL: '/api/notification',
        });
    },

    methods: {
        ...mapActions(['setPage']),
    },
};
</script>