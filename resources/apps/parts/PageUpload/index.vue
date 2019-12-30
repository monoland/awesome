<template>
    <v-card class="absolute" style="left: 16px; bottom: 16px; z-index: 999; overflow: hidden;" v-show="upload.model">
        <div class="d-block absolute"
            :id="upload.uuid"
            style="height: 48px; width: 48px; left: -48px;"
        ></div>

        <v-card-actions>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>arrow_upward</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="body-2 pr-12">
                        {{ upload.fileName }} | {{ upload.totalBytes }}MB
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar class="body-2">
                    {{ upload.uploadedBytes }}MB
                </v-list-item-avatar>
            </v-list-item>
        </v-card-actions>

        <v-progress-linear
            v-model="upload.percent"
            :color="$root.theme"
            height="4"
            reactive
        ></v-progress-linear>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-page-upload',

    computed: {
        ...mapState(['auth', 'upload'])
    },
};
</script>