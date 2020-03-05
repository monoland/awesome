<template>
    <v-page-wrap :overflow="device.mobile">
        <v-data-form>
            <v-row :no-gutters="device.mobile">
                <v-col sm="12" cols="12">
                    <v-text-field
                        :hide-details="device.desktop"
                        label="Name"
                        v-model="record.name"
                    ></v-text-field>
                </v-col>

                <v-col sm="12">
                    <v-expansion-panels flat>
                        <v-expansion-panel v-for="(data, index) in modules" :key="index">
                            <v-expansion-panel-header :color="`${theme}--text text--lighten-4`">
                                <v-row no-gutters>
                                    <v-col class="mr-4" style="flex-grow: 0;">
                                        <v-icon>{{ data.icon }}</v-icon>
                                    </v-col>

                                    <v-col>
                                        <div 
                                            class="d-block py-1 grey--text text--darken-4" 
                                            style="margin-top: 1px;"
                                        >
                                            {{ data.name }}
                                        </div>
                                    </v-col>

                                    <v-col class="mr-4" style="flex-grow: 0;">
                                        <v-permission-check
                                            :value="data.id"
                                            :items="record.permissions"
                                            :reffs="data.permissions"
                                            v-model="record.modules"
                                        ></v-permission-check>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content :class="`${theme} lighten-5`">
                                <v-simple-table class="mt-3">
                                    <template #default>
                                        <thead>
                                            <tr>
                                                <th 
                                                    v-for="label in data.labels" :key="label"
                                                    class="text-center overline"
                                                >
                                                    {{ label }}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td 
                                                    v-for="permission in data.permissions" :key="permission"
                                                    class="text-center" 
                                                >
                                                    <span class="d-inline-block" style="max-width: 24px;">
                                                        <v-checkbox 
                                                            :color="theme"
                                                            :value="permission"
                                                            v-model="record.permissions"
                                                        ></v-checkbox>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-data-form>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-role',

    computed: {
        ...mapState(['device', 'page', 'record', 'theme']),

        modules: function() {
            if (this.page && this.page.combos.hasOwnProperty('modules')) {
                return this.page.combos.modules;
            }

            return [];
        }
    },

    created() {
        this.setPage({
            dataURL: '/api/role'
        });
    },

    methods: {
        ...mapActions(['setPage']),

        toggleCheck: function(data, index) {
            let moduleIndex = this.record.modules.findIndex(obj => obj === data.id);

            if (moduleIndex === -1) {
                this.record.modules.push(data.id);
                this.page.combos.modules[index].status = 'check_box';

                data.permissions.forEach(permission => {
                    this.record.permissions.push(permission);
                });
            } else {
                data.permissions.forEach(permission => {
                    let permissionIndex = this.record.permissions.findIndex(obj => obj === permission);

                    if (permissionIndex !== -1) {
                        this.record.permissions.splice(permissionIndex, 1);
                    }
                });
                
                this.record.modules.splice(moduleIndex, 1);
                this.page.combos.modules[index].status = 'check_box_outline_blank';
            }
        }
    },

    watch: {
        'record.modules': function(modules, oldvalues) {
            if (!oldvalues || !modules) return;

            let addnew = modules.filter(x => !oldvalues.includes(x))[0];
            let remove = oldvalues.filter(x => !modules.includes(x))[0];
            
            if (addnew) {
                let moduleIndex = this.page.combos.modules.findIndex(obj => obj.id === addnew);
                let permissions = this.page.combos.modules[moduleIndex].permissions;

                permissions.forEach(permission => {
                    if (this.record.permissions.indexOf(permission) === -1) {
                        this.record.permissions.push(permission);
                    }
                });
            }

            if (remove) {
                let moduleIndex = this.page.combos.modules.findIndex(obj => obj.id === remove);
                let permissions = this.page.combos.modules[moduleIndex].permissions;

                permissions.forEach(permission => {
                    let permissionIndex = this.record.permissions.indexOf(permission);
                    
                    this.record.permissions.splice(permissionIndex, 1);
                });
            }
        },
    }
};
</script>