<template>
    <div class="v-page">
        <v-page-toolbar update-only @update="dialogPost" />
        
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
                                            </v-avatar>
                                        </template>
                                    </v-hover>

                                    <div class="d-flex justify-center mt-2">{{ record.name }}</div>
                                </div>
                            </div>
                        </div>
                    </v-img>

                    <v-card-text>
                        <v-row :no-gutters="mobile">
                            <v-col cols="12">
                                <v-text-field 
                                    label="Katasandi Lama"
                                    :color="$root.theme"
                                    v-model="record.old_password"
                                    :append-icon="hidden1 ? 'visibility_off' : 'visibility'"
                                    :type="hidden1 ? 'password' : 'text'"
                                    :hide-details="!mobile"
                                    @click:append="hidden1 = !hidden1"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field 
                                    label="Katasandi Baru"
                                    :color="$root.theme"
                                    v-model="record.password"
                                    :append-icon="hidden2 ? 'visibility_off' : 'visibility'"
                                    :type="hidden2 ? 'password' : 'text'"
                                    :hide-details="!mobile"
                                    @click:append="hidden2 = !hidden2"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field 
                                    label="Konfirmasi Sandi"
                                    :color="$root.theme"
                                    v-model="record.password_confirmation"
                                    :append-icon="hidden3 ? 'visibility_off' : 'visibility'"
                                    :type="hidden3 ? 'password' : 'text'"
                                    :hide-details="!mobile"
                                    @click:append="hidden3 = !hidden3"
                                ></v-text-field>
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
    name: 'backend-password',

    mixins: [pageMixins],

    data:() => ({
        hidden1: true,
        hidden2: true,
        hidden3: true,
    }),

    created() {
        this.initPage({
            icon: 'lock',
            title: 'Profile',
        });

        this.setPageURL(`api/password`);

        this.recordFetchCurrent();
    },

    mounted() {
        // 
    },

    methods: {
        // 
    }
};
</script>