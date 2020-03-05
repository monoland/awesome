<template>
    <v-page-wrap hide-datas hide-records>
        <v-card class="mx-auto" flat :min-height="device.mobile ? 'calc(100vh - 56px)' : 'calc(100vh - 64px)'" :max-width="device.mobile ? '100vw' : '450'">
            <v-img :class="[theme + ' lighten-2 with-backdrop']" :aspect-ratio="16/9" :src="record.background">
                <div class="d-flex flex-column align-center justify-center user-select-none" style="height: 100%;">
                    <div style="max-width: 128px; max-height: 128px;">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <v-avatar class="elevation-2" color="white" :size="device.mobile ? 112 : 128">
                                    <v-img :src="record.avatar"></v-img>

                                    <v-fade-transition>
                                        <v-overlay absolute v-if="hover">
                                            <v-btn icon @click="editAvatar">
                                                <v-icon>photo_camera</v-icon>
                                            </v-btn>
                                        </v-overlay>
                                    </v-fade-transition>
                                </v-avatar>
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
                            label="Email"
                            :hide-details="device.desktop"
                            v-model="record.email"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            label="Nama"
                            :hide-details="device.desktop"
                            v-model="record.name"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-select
                            label="Theme"
                            :items="themes"
                            :hide-details="device.desktop"
                            v-model="record.theme"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-profile',

    computed: {
        ...mapState(['device', 'http', 'record', 'theme'])
    },

    created() {
        this.setPage({
            dataURL: '/api/profile',
            fetchMode: 'single',
            buttons: [
                { icon: 'check', text: 'update', click: this.recordPost }
            ]
        });
    },

    data:() => ({
        themes: [
            { value: 'red', text: 'Red'},
            { value: 'pink', text: 'Pink'},
            { value: 'purple', text: 'Purple'},
            { value: 'deep-purple', text: 'Deep Purple'},
            { value: 'indigo', text: 'Indigo'},
            { value: 'blue', text: 'Blue'},
            { value: 'light-blue', text: 'Light Blue'},
            { value: 'cyan', text: 'Cyan'},
            { value: 'teal', text: 'Teal'},
            { value: 'green', text: 'Green'},
            { value: 'light-green', text: 'Light Green'},
            { value: 'lime', text: 'Lemon'},
            { value: 'yellow', text: 'Yellow'},
            { value: 'amber', text: 'Amber'},
            { value: 'orange', text: 'Orange'},
            { value: 'deep-orange', text: 'Deep Orange'},
            { value: 'brown', text: 'Brown'},
            { value: 'blue-grey', text: 'Blue Grey'},
            { value: 'grey', text: 'Grey'},
        ],
    }),

    methods: {
        ...mapActions(['assignFileBrowse', 'recordPost', 'setPage']),

        editBackground: function() {
            this.assignFileBrowse({
                fileType: ['.jpg', '.jpeg', '.png'],
                query: { 
                    doctype: 'user-background' 
                },
                callback: (response) => {
                    this.record.background = response.path;
                }
            });
        },

        editAvatar: function() {
            this.assignFileBrowse({
                fileType: ['.jpg', '.jpeg', '.png'],
                query: { 
                    doctype: 'user-avatar' 
                },
                callback: (response) => {
                    this.record.avatar = response.path;
                }
            });
        }
    },
};
</script>