<template>
    <v-slide-y-reverse-transition>
        <div class="position-fixed upload-interactive" v-show="device.desktop && upload.progress">
            <v-card min-height="64" flat>
                <v-card-text class="pa-2" style="height: 64px;">
                    <div class="d-flex" style="height: 100%;">
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
        </div>
    </v-slide-y-reverse-transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-upload-desktop',

    computed: {
        ...mapState(['device', 'upload']),
    },
};
</script>