<template>
    <v-page-wrap hide-datas hide-records>
        <v-card class="mx-auto" flat 
            :min-height="device.mobile ? 'calc(100vh - 56px)' : 'calc(100vh - 64px)'" 
            :max-width="device.mobile ? '100vw' : '450'"
        >
            <v-img 
                :class="[theme + ' lighten-2 with-backdrop']" 
                :aspect-ratio="16/9" 
                :src="record.background"
            >
                <div 
                    class="d-flex flex-column align-center justify-center user-select-none" 
                    style="height: 100%;"
                >
                    <div style="max-width: 128px; max-height: 128px;">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-img :src="record.logo" style="max-width: 128px;">
                                    <v-fade-transition>
                                        <v-overlay opacity="0.01" absolute v-if="hover">
                                            <v-btn icon @click="editLogo">
                                                <v-icon>photo_camera</v-icon>
                                            </v-btn>
                                        </v-overlay>
                                    </v-fade-transition>
                                </v-img>
                            </template>
                        </v-hover>
                    </div>

                    <div style="position: absolute; right: 8px; bottom: 8px; height: 36px; width: 36px;">
                        <v-btn icon dark @click="editBackground">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-img>

            <v-card-text>
                <v-row :no-gutters="device.mobile">
                    <v-col cols="12">
                        <v-text-field
                            label="Company"
                            :hide-details="device.desktop"
                            v-model="record.company"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            label="Company Extended"
                            :hide-details="device.desktop"
                            v-model="record.companyExtended"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            label="Product"
                            :hide-details="device.desktop"
                            v-model="record.product"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            label="Product Extended"
                            :hide-details="device.desktop"
                            v-model="record.productExtended"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            label="Slogan"
                            :hide-details="device.desktop"
                            v-model="record.slogan"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea
                            auto-grow
                            label="Desription"
                            :hide-details="device.desktop"
                            v-model="record.description"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-setting',

    computed: {
        ...mapState(['device', 'record', 'theme'])
    },

    created() {
        this.setPage({
            dataURL: '/api/setting',
            fetchMode: 'single',
            buttons: [
                { icon: 'check', text: 'update', click: this.recordPatch }
            ]
        });
    },

    methods: {
        ...mapActions(['assignFileBrowse', 'recordPatch', 'setPage']),

        editBackground: function() {
            this.assignFileBrowse({
                fileType: ['.jpg', '.jpeg', '.png'],
                query: { 
                    doctype: 'moui-background' 
                },
                callback: (response) => {
                    this.record.background = response.path;
                }
            });
        },

        editLogo: function() {
            this.assignFileBrowse({
                fileType: ['.jpg', '.jpeg', '.png'],
                query: { 
                    doctype: 'moui-background' 
                },
                callback: (response) => {
                    this.record.logo = response.path;
                }
            });
        }
    },
};
</script>