<template>
    <v-dialog 
        v-model="trash.state"
        max-width="332px"
        persistent 
    >
        <v-card elevation="0" class="v-card--widget mt-4 mx-auto" style="border-radius: 4px;">
            <v-sheet
                class="v-sheet--offset py-3 px-3 mx-auto"
                elevation="0"
                color="deep-orange"
                max-width="calc(100% - 32px)"
            >
                <span class="d-block title font-weight-regular mb-2 white--text">{{ `Hapus ${trashCount} data?` }}</span>
                <span class="d-block f-nunito caption font-weight-regular text-uppercase white--text">konfirmasi penghapusan data.</span>
            </v-sheet>

            <v-card-text class="px-3" style="text-align: justify;">
                <span class="subheading font-weight-light">
                    Menghapus data ini juga akan menghapus semua data yang terhubung dengan ini. Anda tidak dapat membatalkan ini.
                </span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="$root.theme" flat @click="postDelete">{{ submitName }}</v-btn>
                <v-btn :color="$root.theme" flat @click="closeDelete">{{ cancelName }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'v-page-trash',

    computed: {
        ...mapState(['trash', 'records']),

        ...mapGetters(['trashCount']),
    },

    props: {
        submitName: {
            type: String,
            default: 'delete'
        },

        cancelName: {
            type: String,
            default: 'cancel'
        },
    },

    methods: {
        ...mapActions(['closeDelete', 'postDelete'])
    }
};
</script>
