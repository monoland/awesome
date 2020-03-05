<template>
    <v-page-wrap>
        <template #records>
            <v-table-desktop></v-table-desktop>
            <v-table-mobile></v-table-mobile>
        </template>

        <v-data-form>
            <v-row :no-gutters="device.mobile">
                <v-col cols="12">
                    <v-text-field
                        label="Name"
                        :hide-details="device.desktop"
                        v-model="record.name"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-data-form>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-home',

    route: { 
        path: '', 
        name: 'home', 
        auth: true, 
        root: '/home' 
    },

    computed: {
        ...mapState(['device', 'record'])
    },

    created() {
        this.setPage({
            dataURL: '/api/customer',
        });
    },

    methods: {
        ...mapActions(['setPage']),
    },
}
</script>