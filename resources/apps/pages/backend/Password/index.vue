<template>
    <v-card height="100%" color="transparent" flat>
        <v-header :searchable="false">
            <v-btn :color="$root.theme" icon flat @click="updatePassword(user)">
                <v-icon>done</v-icon>
            </v-btn>
        </v-header>

        <v-card-text class="pa-0" :style="dynHeight">
            <v-container class="pa-0" fill-height>
                <v-layout justify-center wrap>
                    <v-card flat :width="dynWidth">
                        <v-card-image :uploader="false"
                            v-model="record.avatar"
                        ></v-card-image>

                        <v-card-text>
                            <v-layout justify-center wrap>
                                <v-flex xs12>
                                    <v-text-field 
                                        label="Katasandi Lama"
                                        :color="$root.theme"
                                        v-model="user.old_password"
                                        :append-icon="hidden1 ? 'visibility_off' : 'visibility'"
                                        :type="hidden1 ? 'password' : 'text'"
                                        @click:append="hidden1 = !hidden1"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field 
                                        label="Katasandi Baru"
                                        :color="$root.theme"
                                        v-model="user.password"
                                        :append-icon="hidden2 ? 'visibility_off' : 'visibility'"
                                        :type="hidden2 ? 'password' : 'text'"
                                        @click:append="hidden2 = !hidden2"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field 
                                        label="Konfirmasi Sandi"
                                        :color="$root.theme"
                                        v-model="user.password_confirmation"
                                        :append-icon="hidden3 ? 'visibility_off' : 'visibility'"
                                        :type="hidden3 ? 'password' : 'text'"
                                        @click:append="hidden3 = !hidden3"
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
    name: 'page-password',

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
        user: {
            old_password: null,
            password: null,
            password_confirmation: null
        },

        hidden1: true,
        hidden2: true,
        hidden3: true
    }),

    created() {
        this.setPageInfo({
            icon: 'people',
            title: 'Katasandi',
        });

        this.setRecord(this.$auth.user);
        this.newRecord();
    },

    mounted() {
        this.$store.subscribe((mutation, state) => {
            // 
        });
    },

    methods: {
        ...mapActions(['setPageInfo', 'setRecord', 'newRecord', 'updatePassword']),
    },
}
</script>