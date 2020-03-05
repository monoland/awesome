<template>
    <v-page-wrap hide-datas hide-records overflow>
        <v-container class="py-1 px-4">
            <v-row>
                <v-col sm="3" cols="6">
                    <v-data-widget :theme="theme"></v-data-widget>
                </v-col>
                <v-col sm="3" cols="6">
                    <v-data-widget :theme="theme"></v-data-widget>
                </v-col>
                <v-col sm="3" cols="6">
                    <v-data-widget :theme="theme"></v-data-widget>
                </v-col>
                <v-col sm="3" cols="6">
                    <v-data-widget :theme="theme"></v-data-widget>
                </v-col>
            </v-row>
        </v-container>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-home',

    computed: {
        ...mapState(['device', 'record', 'theme'])
    },

    created() {
        this.setPage({
            dataURL: '/api/dashboard',
            fetchMode: 'single',
        });
    },

    methods: {
        ...mapActions(['setPage']),
    },
}
</script>