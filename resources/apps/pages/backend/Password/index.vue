<template>
    <v-page-wrap hide-datas hide-records>
        <v-card class="mx-auto" flat :min-height="device.mobile ? 'calc(100vh - 56px)' : 'calc(100vh - 64px)'" :max-width="device.mobile ? '100vw' : '450'">
            <v-img :class="[theme + ' lighten-2 with-backdrop']" :aspect-ratio="16/9" :src="record.background">
                <div class="d-flex flex-column align-center justify-center user-select-none" style="height: 100%;">
                    <div style="max-width: 128px; max-height: 128px;">
                        <v-avatar class="elevation-2" color="white" :size="device.mobile ? 112 : 128">
                            <v-img :src="record.avatar"></v-img>
                        </v-avatar>
                    </div>
                </div>
            </v-img>

            <v-card-text>
                <v-row :no-gutters="device.mobile">
                    <v-col cols="12">
                        <v-text-field 
                            label="Katasandi Lama"
                            :color="$root.theme"
                            :append-icon="hidden1 ? 'visibility_off' : 'visibility'"
                            :type="hidden1 ? 'password' : 'text'"
                            :hide-details="device.desktop"
                            v-model="record.old_password"
                            @click:append="hidden1 = !hidden1"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field 
                            label="Katasandi Baru"
                            :color="$root.theme"
                            :append-icon="hidden2 ? 'visibility_off' : 'visibility'"
                            :type="hidden2 ? 'password' : 'text'"
                            :hide-details="device.desktop"
                            v-model="record.password"
                            @click:append="hidden2 = !hidden2"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field 
                            label="Konfirmasi Sandi"
                            :color="$root.theme"
                            :append-icon="hidden3 ? 'visibility_off' : 'visibility'"
                            :type="hidden3 ? 'password' : 'text'"
                            :hide-details="device.desktop"
                            v-model="record.password_confirmation"
                            @click:append="hidden3 = !hidden3"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-page-wrap>
</template>

<script>
import { mapActions, mapState } from  'vuex';

export default {
    name: 'moui-password',

    computed: {
        ...mapState(['device', 'record', 'theme'])
    },

    created() {
        this.setPage({
            dataURL: '/api/password',
            fetchMode: 'single',
            buttons: [
                { icon: 'check', text: 'update', click: this.recordPost }
            ]
        });
    },

    data:() => ({
        hidden1: true,
        hidden2: true,
        hidden3: true,
    }),

    methods: {
        ...mapActions(['recordPost', 'setPage'])
    },
};
</script>