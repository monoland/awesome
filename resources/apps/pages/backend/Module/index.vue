<template>
    <v-page-wrap :overflow="device.mobile">
        <v-data-form>
            <v-row :no-gutters="device.mobile">
                <v-col sm="6" cols="12">
                    <v-text-field
                        label="Name"
                        :hide-details="device.desktop"
                        v-model="record.name"
                    ></v-text-field>
                </v-col>

                <v-col sm="6" cols="12">
                    <v-text-field
                        label="Maps"
                        :hide-details="device.desktop"
                        v-model="record.maps"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        label="Path"
                        :hide-details="device.desktop"
                        v-model="record.path"
                    ></v-text-field>
                </v-col>

                <v-col sm="6" cols="12">
                    <v-text-field
                        label="Apps"
                        :hide-details="device.desktop"
                        v-model="record.apps"
                    ></v-text-field>
                </v-col>

                <v-col sm="6" cols="12">
                    <v-text-field
                        label="Icon"
                        :hide-details="device.desktop"
                        v-model="record.icon"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-switch
                        label="Set this module to sidebar menu"
                        :hide-details="device.desktop"
                        v-model="record.menu"
                    ></v-switch>
                </v-col>
            </v-row>
        </v-data-form>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-module',

    computed: {
        ...mapState(['device', 'record'])
    },

    created() {
        this.setPage({
            dataURL: '/api/module',

            bindMethod: {
                downward: this.recordMoveDown,
                upward: this.recordMoveUp,
                permission: this.openPermission
            }
        });
    },

    data:() => ({
        types: ['item', 'subheader']
    }),

    methods: {
        ...mapActions(['recordMoveDown', 'recordMoveUp', 'setPage']),

        openPermission: function() {
            this.$router.push({ name: 'moui-permission', params: { module: this.record.id } });
        }
    },
};
</script>