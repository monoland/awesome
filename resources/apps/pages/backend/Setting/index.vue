<template>
    <v-card height="100%" color="transparent" flat>
        <v-header :searchable="false">
            <v-btn :color="$root.theme" icon flat @click="updateSetting">
                <v-icon>done</v-icon>
            </v-btn>
        </v-header>

        <v-card-text class="pa-0" :style="dynHeight">
            <v-container class="pa-0" fill-height>
                <v-layout justify-center wrap>
                    <v-card flat :width="dynWidth">
                        <v-card-image
                            icon="photo"
                            v-model="setting.meta['avatar']"
                        ></v-card-image>

                        <v-card-text>
                            <v-layout justify-center wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Nama Perusahaan"
                                        :color="$root.theme"
                                        v-model="setting.meta['name']"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea
                                        label="Slogan"
                                        :color="$root.theme"
                                        v-model="setting.meta['slogan']"
                                    ></v-textarea>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                        label="Tinggi"
                                        :color="$root.theme"
                                        v-model="setting.meta['height']"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                        label="Lebar"
                                        :color="$root.theme"
                                        v-model="setting.meta['width']"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'page-setting',

    computed: {
        ...mapState(['setting']),

        dynWidth: function() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return '100%';
            }

            return '360px';
        },

        dynHeight: function() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return 'height: calc(100% - 56px)';
            }

            return 'height: calc(100% - 64px)';
        }
    },

    created() {
        this.setPageInfo({
            icon: 'people',
            title: 'Setting',
        });

        this.fetchSetting();
    },

    methods: {
        ...mapActions(['setPageInfo', 'fetchSetting', 'updateSetting']),
    },
}
</script>