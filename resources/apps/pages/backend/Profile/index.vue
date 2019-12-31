<template>
    <div class="v-page">
        <v-page-toolbar update-only @update="dialogPost({ commit: 'COMMIT_USER' })" />
        
        <div class="v-page--wrap">
            <div class="v-page__content">
                <v-card class="mx-auto no-border" :max-width="414" flat :style="mobile ? `min-height: calc(100vh - 56px);` : `min-height: calc(100vh - 64px);`">
                    <v-img class="grey lighten-5" :src="record.background"  :aspect-ratio="16/9" style="max-height: 210px;">
                        <div class="d-flex align-center justify-center" style="height: 100%;">
                            <div class="d-flex align-center justify-center">
                                <div class="d-block" style="height: 132px; min-width: 112px;">
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-avatar class="elevation-2" color="white" :size="mobile ? 112 : 128">
                                                <v-img :src="record.avatar"></v-img>

                                                <v-fade-transition>
                                                    <v-overlay absolute v-if="hover">
                                                        <v-btn icon @click="uploadAvatar">
                                                            <v-icon>photo_camera</v-icon>
                                                        </v-btn>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </v-avatar>
                                        </template>
                                    </v-hover>

                                    <div class="d-flex justify-center mt-2">{{ record.name }}</div>
                                </div>

                                <v-btn class="absolute" icon style="right: 8px; bottom: 8px;" @click="uploadBackground">
                                    <v-icon>photo_camera</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-img>

                    <v-card-text>
                        <v-row :no-gutters="mobile">
                            <v-col cols="12">
                                <v-text-field
                                    label="Email"
                                    v-model="record.email"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col sm="6" cols="12">
                                <v-text-field
                                    label="Nama"
                                    v-model="record.name"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col sm="6" cols="12">
                                <v-select
                                    :items="themes"
                                    label="Theme"
                                    v-model="record.theme"
                                    :hide-details="!mobile"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { pageMixins } from '@apps/mixins/PageMixins';

export default {
    name: 'backend-profile',

    mixins: [pageMixins],

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

    created() {
        this.initPage({
            icon: 'perm_identity',
            title: 'Profile',
        });

        this.setPageURL(`api/profile`);

        this.recordFetchCurrent();
    },

    mounted() {
        this.setUploadOptions({
            acceptFiles: 'image/png, image/jpeg',
            allowedExtensions: ['png', 'jpg', 'jpeg'],
        });
    },

    methods: {
        uploadAvatar: function() {
            this.fineUploader.setParams({ mediaName: 'user-avatar' });

            this.setUploadCallback(response => {
                this.record.avatar = response.record.path
            });

            setTimeout(() => {
                this.upload.input.click();
            }, 300);
        },

        uploadBackground: function() {
            this.fineUploader.setParams({ mediaName: 'user-backdrop' });
            
            this.setUploadCallback(response => {
                this.record.background = response.record.path
            });

            setTimeout(() => {
                this.upload.input.click();
            }, 300);
        }
    }
};
</script>