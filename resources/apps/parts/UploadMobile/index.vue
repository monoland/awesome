<template>
    <v-dialog 
        fullscreen 
        hide-overlay 
        transition="dialog-bottom-transition"
        :value="device.mobile && upload.progress" 
    >
        <v-card>
            <v-toolbar dark :color="theme">
                <v-toolbar-title>Upload</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <div class="d-flex mt-6" style="height: 100%;">
                    <div class="d-block">
                        <v-avatar tile color="cyan">
                            <v-icon dark>cloud_upload</v-icon>
                        </v-avatar>
                    </div>

                    <div class="d-flex flex-column" style="flex: 1 1 0; margin-left: 8px;">
                        <div class="d-flex">
                            <div class="d-block" style="flex: 1 1 0;">
                                <div class="d-inline-block text-truncate" style="max-width: 220px;">
                                    {{ upload.filename }}
                                </div>
                            </div>

                            <div class="d-block">
                                {{ upload.size }}
                            </div>
                        </div>

                        <v-progress-linear
                            v-model="upload.percent"
                            color="blue-grey"
                            height="20"
                            reactive
                            dark
                        >
                            <template v-slot="{ value }">
                                <strong>{{ value }}%</strong>
                            </template>
                        </v-progress-linear>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-upload-mobile',

    computed: {
        ...mapState(['device', 'upload', 'theme']),


    },
};
</script>