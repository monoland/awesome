<template>
    <div class="v-page">
        <v-page-toolbar update-only @update="dialogPost({ dataURL: 'web-info' })" />
        
        <div class="v-page--wrap">
            <div class="v-page__content">
                <v-card flat 
                    class="mx-auto no-border" 
                    :max-width="414" 
                    :style="mobile ? `min-height: calc(100vh - 56px);` : `min-height: calc(100vh - 64px);`"
                >
                    <v-img class="grey lighten-5" :src="record.background"  :aspect-ratio="16/9">
                        <div class="d-flex flex-column fill-height">
                            <div class="d-flex align-center justify-center" style="flex: 1 1 auto;">
                                <v-hover>
                                    <template v-slot:default="{ hover }">
                                        <v-img :src="record.logo" style="max-width: 128px;">
                                            <v-fade-transition>
                                                <v-overlay opacity="0.1" absolute v-if="hover">
                                                    <v-btn icon @click="uploadLogo">
                                                        <v-icon>photo_camera</v-icon>
                                                    </v-btn>
                                                </v-overlay>
                                            </v-fade-transition>
                                        </v-img>
                                    </template>
                                </v-hover>
                            </div>

                            <v-btn class="absolute" icon style="right: 8px; bottom: 8px;" @click="uploadBackground">
                                <v-icon>photo_camera</v-icon>
                            </v-btn>
                        </div>
                    </v-img>

                    <v-card-text>
                        <v-row :no-gutters="mobile">
                            <v-col cols="6">
                                <v-text-field
                                    label="Company"
                                    v-model="record.company"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                    label="Company Extended"
                                    v-model="record.companyExtended"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                    label="Product"
                                    v-model="record.product"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                    label="Product Extended"
                                    v-model="record.productExtended"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    label="Slogan"
                                    v-model="record.slogan"
                                    :hide-details="!mobile"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    auto-grow
                                    label="Desription"
                                    v-model="record.description"
                                    :hide-details="!mobile"
                                ></v-textarea>
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

    created() {
        this.initPage({
            icon: 'settings',
            title: 'Pengaturan',
        });

        this.setPageURL(`api/setting`);

        this.recordFetchCurrent({
            name: 'web-info'
        });
    },

    mounted() {
        this.setUploadOptions({
            acceptFiles: 'image/png, image/jpeg',
            allowedExtensions: ['png', 'jpg', 'jpeg'],
        });
    },

    methods: {
        uploadLogo: function() {
            this.fineUploader.setParams({ mediaName: 'apps-logo' });

            this.setUploadCallback(response => {
                this.record.logo = response.record.path
            });

            setTimeout(() => {
                this.upload.input.click();
            }, 300);
        },

        uploadBackground: function() {
            this.fineUploader.setParams({ mediaName: 'apps-backdrop' });
            
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