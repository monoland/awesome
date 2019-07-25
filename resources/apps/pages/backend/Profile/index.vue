<template>
    <v-card height="100%" color="transparent" flat>
        <v-header :searchable="false">
            <v-btn :color="$root.theme" icon flat @click="updateProfile">
                <v-icon>done</v-icon>
            </v-btn>
        </v-header>

        <v-card-text class="pa-0" :style="dynHeight">
            <v-container class="pa-0" fill-height>
                <v-layout justify-center wrap>
                    <v-card flat :width="dynWidth">
                        <v-card-image
                            v-model="record.avatar"
                        ></v-card-image>

                        <v-card-text>
                            <v-layout justify-center wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Nama Pengguna"
                                        :color="$root.theme"
                                        v-model="record.name"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        label="Alamat Email"
                                        :color="$root.theme"
                                        v-model="record.email"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                        label="Warna Thema"
                                        :color="$root.theme"
                                        :items="colors"
                                        v-model="record.theme"
                                    ></v-select>
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
    name: 'page-profile',

    computed: {
        ...mapState(['record']),

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

    data:() => ({
        colors: [
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
        ]
    }),

    created() {
        this.setPageInfo({
            icon: 'people',
            title: 'Pengguna',
        });

        this.setRecord(this.$auth.user);
        this.newRecord();
    },

    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'auth') {
                this.$root.theme = mutation.payload.theme;
            }
        });
    },

    methods: {
        ...mapActions(['setPageInfo', 'setRecord', 'newRecord', 'updateProfile']),
    },
}
</script>