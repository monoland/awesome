<template>
    <v-page-wrap>
        <v-data-form>
            <v-row :no-gutters="device.mobile">
                <v-col cols="12">
                    <v-text-field
                        label="Name"
                        :hide-details="device.desktop"
                        v-model="record.name"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" v-if="form.state === 'updateState'">
                    <v-text-field
                        label="Name"
                        :hide-details="device.desktop"
                        v-model="record.secret"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-data-form>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-client',

    computed: {
        ...mapState(['device', 'form', 'record'])
    },

    created() {
        this.setPage({
            dataURL: '/api/client',
        });
    },

    methods: {
        ...mapActions(['setPage']),
    },
};
</script>