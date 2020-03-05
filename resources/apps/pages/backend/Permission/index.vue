<template>
    <v-page-wrap :overflow="device.mobile">

    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-permission',

    computed: {
        ...mapState(['device', 'record'])
    },

    created() {
        this.setPage({
            dataURL: `/api/module/${this.$route.params.module}/permission`,
        });
    },

    methods: {
        ...mapActions(['setPage']),
    },
};
</script>