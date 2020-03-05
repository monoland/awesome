<template>
    <v-page-wrap :overflow="device.mobile">
        <v-data-form>
            <v-row :no-gutters="device.mobile">
                <v-col cols="12">
                    <v-text-field
                        label="Name"
                        :hide-details="device.desktop"
                        v-model="record.name"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        label="Email"
                        :hide-details="device.desktop"
                        v-model="record.email"
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-select
                        label="Theme"
                        :hide-details="device.desktop"
                        :items="themes"
                        v-model="record.theme"
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <div class="d-block overline mb-2">roles</div>
                    
                    <v-card-text class="grey lighten-4 py-1">
                        <v-radio-group v-model="record.role">
                            <v-radio 
                                v-for="(role, index) in roles" 
                                :key="index"
                                :label="role.text"
                                :value="role.value"
                                :hide-details="device.desktop"
                            ></v-radio>
                        </v-radio-group>    
                    </v-card-text>
                </v-col>

                <v-col cols="12 pt-0">
                    <v-switch
                        label="Set this current as active user"
                        :hide-details="device.desktop"
                        v-model="record.active"
                        inset
                    ></v-switch>
                </v-col>
            </v-row>
        </v-data-form>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-account',

    computed: {
        ...mapState(['device', 'page', 'record']),

        roles: function() {
            if (this.page && this.page.combos.hasOwnProperty('roles')) {
                return this.page.combos.roles;
            }

            return [];
        }
    },

    created() {
        this.setPage({
            dataURL: '/api/account',
        });
    },

    data:() => ({
        themes: [
            'red', 'pink', 'purple', 'deep-purple', 'indigo', 
            'blue', 'light-blue', 'cyan', 'teal' ,'green', 'light-green',
            'lime', 'yellow', 'amber', 'orange', 'deep-orange', 
            'brown', 'blue-grey', 'grey'
        ]
    }),

    methods: {
        ...mapActions(['setPage']),
    },
};
</script>